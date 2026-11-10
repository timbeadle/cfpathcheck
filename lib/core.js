import { existsSync } from 'node:fs';
import path from 'node:path';
import { getFiles, readFile } from './file.js';
import {
	containsObject,
	checkIsXMLFile,
	matchAll,
} from './utils.js';

/**
 * Formats the violation reported for a prefix that has no counterpart in the other array.
 *
 * @param {object} value The taglib prefix usage
 * @param {string} message The message to display, with `{2}` replaced by the prefix
 * @param {string} severity How serious the reported problem is
 *
 * @returns {object} A violation object
 */
const createPrefixViolation = (value, message, severity) => ({
	line: value.line,
	column: value.column || 1,
	message: message.replace('{2}', () => value.prefix),
	severity,
});

/**
 * Adds a violation to a prefix's list, avoiding duplicates at the same position.
 *
 * @param {Map<string, Array<object>>} violationsByPrefix Violations grouped by prefix
 * @param {string} prefix The prefix the violation belongs to
 * @param {object} violation The violation to add
 */
const addPrefixViolation = (violationsByPrefix, prefix, violation) => {
	const prefixViolations = violationsByPrefix.get(prefix) ?? [];

	if (!containsObject(violation, prefixViolations)) {
		prefixViolations.push(violation);
	}

	violationsByPrefix.set(prefix, prefixViolations);
};

/**
 * Compares two arrays of cfml taglib prefixes to see if there are any mismatches.
 *
 * @param {Array<string>} prefixArray1 The first array of taglib prefixes
 * @param {Array<string>} prefixArray2 The second array of taglib prefixes
 * @param {string} message The message to display in case of a violation
 * @param {string} severity The violation severity
 *
 * @returns {Array<object>} An array of violation objects
 */
export const comparePrefixArrays = (prefixArray1, prefixArray2, message, severity) => {
	const matchedPrefixes = new Set(prefixArray2.map((value) => value.prefix));
	const violationsByPrefix = new Map();

	for (const value of prefixArray1) {
		if (matchedPrefixes.has(value.prefix)) {
			continue;
		}

		addPrefixViolation(
			violationsByPrefix,
			value.prefix,
			createPrefixViolation(value, message, severity),
		);
	}

	return violationsByPrefix.values().toArray().flat();
};

/**
 * Creates a violation object for a path which cannot be found on the filesystem.
 *
 * @param {RegExpExecArray} match The regex match which found the path
 * @param {number} lineNumber The line number the path was found on
 * @param {string} message The message to display
 *
 * @returns {object} A violation object
 */
const createPathViolation = (match, lineNumber, message) => ({
	line: lineNumber,
	column: match.index + 1,
	message,
	severity: 'error',
});

/**
 * Resolves a path against the directory of the file being analysed, unless the
 * path is already absolute.
 *
 * @param {string} targetPath The path to resolve
 * @param {string} fileDirname The directory of the file being analysed
 *
 * @returns {string} The resolved path
 */
const resolvePath = (targetPath, fileDirname) => (
	path.isAbsolute(targetPath)
		? targetPath
		: path.resolve(fileDirname, targetPath)
);

/**
 * Trims the dynamic part off a template path (everything from the first # or &),
 * leaving the static part which can be checked on the filesystem.
 *
 * @param {string} templatePath The template path to trim
 *
 * @returns {string} The static part of the path
 */
const trimDynamicPath = (templatePath) => {
	const hashPos = templatePath.indexOf('#');
	const ampersandPos = templatePath.indexOf('&');

	// Static path – nothing to trim
	if (hashPos === -1 && ampersandPos === -1) {
		return templatePath;
	}

	// Wind the path back to the last slash before the dynamic part
	const searchPos = hashPos === -1 ? ampersandPos : hashPos;
	const lastSlashPos = templatePath.lastIndexOf('/', searchPos);

	return path.dirname(templatePath.slice(0, lastSlashPos));
};

/**
 * Finds the cfimport prefix definitions on a line.
 *
 * @param {string} line The line to search
 * @param {number} lineNumber The number of the line within the file
 *
 * @returns {Array<object>} The prefixes found on the line
 */
const findImportedPrefixes = (line, lineNumber) => {
	const importSearch = line.match(/prefix=["'](?<import>[\dA-Za-z]+)["']/v);

	if (importSearch === null) {
		return [];
	}

	return [
		{
			prefix: importSearch.groups.import,
			line: lineNumber,
			column: importSearch.index + 1,
		},
	];
};

/**
 * Finds the namespace prefix usages on a line. Namespace usages are not
 * collated in XML files, or on `@usage` doc lines including code snippets.
 *
 * @param {string} line The line to search
 * @param {number} lineNumber The number of the line within the file
 *
 * @returns {Array<object>} The prefix usages found on the line
 */
const findPrefixUsages = (line, lineNumber) => {
	// We're outputting an XML file – don't attempt to collate namespace prefix usages
	if (checkIsXMLFile(line) || line.startsWith('@usage')) {
		return [];
	}

	return matchAll(line, /<(?<namespace>[\dA-Za-z]+):/gv).map((match) => ({
		prefix: match.groups.namespace,
		line: lineNumber,
		column: match.index + 1,
	}));
};

/**
 * Checks the cfimport taglib paths on a line, reporting any which don't exist.
 *
 * @param {string} line The line to check
 * @param {number} lineNumber The number of the line within the file
 * @param {string} fileDirname The directory of the file being analysed
 *
 * @returns {Array<object>} An array of violation objects
 */
const checkTaglibPaths = (line, lineNumber, fileDirname) => {
	const violations = [];

	for (const taglibMatch of matchAll(line, /taglib=["'](?<taglib>[^"']+)["']/gv)) {
		const taglibPath = resolvePath(taglibMatch.groups.taglib, fileDirname);

		if (!existsSync(taglibPath)) {
			violations.push(createPathViolation(
				taglibMatch,
				lineNumber,
				`cfimport taglib path ${taglibPath} not found`,
			));
		}
	}

	return violations;
};

/**
 * Checks the cfinclude template paths and cfscript include paths on a line,
 * reporting any which don't exist.
 *
 * @param {string} line The line to check
 * @param {number} lineNumber The number of the line within the file
 * @param {string} fileDirname The directory of the file being analysed
 *
 * @returns {Array<object>} An array of violation objects
 */
const checkIncludePaths = (line, lineNumber, fileDirname) => {
	const violations = [];

	// Checks <cfinclude template="$path" />
	const cfIncludeMatches = matchAll(line, /template=["'](?<path>[^"']+)["']/gv);

	// Checks include '$path'; (inside <cfscript>)
	// @TODO fix vulnerable RegExp
	const includeMatches = matchAll(line, /\binclude\s["'](?<path>.*\.cfm)["']/gv);

	for (const includeMatch of [...cfIncludeMatches, ...includeMatches]) {
		// Dynamic path (contains # or &): all we can check is the non-dynamic part
		let templatePath = trimDynamicPath(includeMatch.groups.path);

		// Can't work with webroot-virtual paths, e.g. /missing.cfm
		if (templatePath.slice(0, 1) === '/') {
			continue;
		}

		// Resolve the templatePath relative to the dirname of the including file
		templatePath = resolvePath(templatePath, fileDirname);

		if (!existsSync(templatePath)) {
			violations.push(createPathViolation(
				includeMatch,
				lineNumber,
				`cfinclude/include template path ${templatePath} not found`,
			));
		}
	}

	return violations;
};

/**
 * Checks a file for missing paths.
 *
 * @param {string} filePath The path of the file to check
 *
 * @returns {Array<object>} An array of violation objects
 */
export const checkFile = (filePath) => {
	const templatePathViolations = [];
	const taglibPathViolations = [];
	const prefixes = [];
	const prefixUsages = [];

	const lines = readFile(filePath).split('\n');

	// Cache the dirname of the file being analysed
	const fileDirname = path.dirname(filePath);

	for (const [index, line] of lines.entries()) {
		const lineNumber = index + 1;

		prefixes.push(...findImportedPrefixes(line, lineNumber));
		prefixUsages.push(...findPrefixUsages(line, lineNumber));
		taglibPathViolations.push(...checkTaglibPaths(line, lineNumber, fileDirname));
		templatePathViolations.push(...checkIncludePaths(line, lineNumber, fileDirname));
	}

	const unusedPrefixViolations = comparePrefixArrays(
		prefixes,
		prefixUsages,
		'cfimported namespace prefix "{2}" not used',
		'warning',
	);

	const unimportedPrefixViolations = comparePrefixArrays(
		prefixUsages,
		prefixes,
		'used namespace prefix "{2}" not cfimported',
		'error',
	);

	return [
		...unimportedPrefixViolations,
		...unusedPrefixViolations,
		...templatePathViolations,
		...taglibPathViolations,
	];
};

/**
 * Checks a file or files for path errors.
 *
 * @param {string} filePath The full path of the file to check
 *
 * @returns {Array<object>} An array of violation objects
 */
export const check = (filePath) => {
	const violations = [];
	const fileNames = getFiles(filePath);

	// Loop over our file list, checking each file
	for (const fileName of fileNames) {
		const fileViolations = checkFile(fileName);

		if (fileViolations.length > 0) {
			violations.push({
				filename: fileName,
				messages: fileViolations,
			});
		}
	}

	return violations;
};
