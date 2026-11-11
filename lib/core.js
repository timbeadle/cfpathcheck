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
 * Collects violations for each prefix, grouping them by prefix and dropping
 * duplicates at the same position.
 *
 * @param {Array<object>} values The prefix values to create violations for
 * @param {string} message The message to display, with `{2}` replaced by the prefix
 * @param {string} severity How serious the reported problem is
 *
 * @returns {Array<object>} An array of violation objects
 */
const collectPrefixViolations = (values, message, severity) => {
	const violationsByPrefix = new Map();

	for (const value of values) {
		addPrefixViolation(
			violationsByPrefix,
			value.prefix,
			createPrefixViolation(value, message, severity),
		);
	}

	return violationsByPrefix.values().toArray().flat();
};

/**
 * Finds the prefixes in the first array which have no counterpart in the second.
 *
 * @param {Array<object>} prefixes The prefixes to check
 * @param {Array<object>} otherPrefixes The prefixes to check against
 *
 * @returns {Array<object>} The prefixes without a counterpart
 */
const findUnmatchedPrefixes = (prefixes, otherPrefixes) => {
	const matchedPrefixes = new Set(otherPrefixes.map((value) => value.prefix));

	return prefixes.filter((value) => !matchedPrefixes.has(value.prefix));
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
export const comparePrefixArrays = (prefixArray1, prefixArray2, message, severity) => (
	collectPrefixViolations(
		findUnmatchedPrefixes(prefixArray1, prefixArray2),
		message,
		severity,
	)
);

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
 * Resolves a path against the directory of the file being analysed. Absolute
 * paths are returned unchanged by `path.resolve`.
 *
 * @param {string} targetPath The path to resolve
 * @param {string} fileDirname The directory of the file being analysed
 *
 * @returns {string} The resolved path
 */
const resolvePath = (targetPath, fileDirname) => path.resolve(fileDirname, targetPath);

/**
 * Trims the dynamic part off a template path (everything from the first # or &),
 * leaving the static part which can be checked on the filesystem.
 *
 * @param {string} templatePath The template path to trim
 *
 * @returns {string} The static part of the path
 */
const trimDynamicPath = (templatePath) => {
	const dynamicStart = templatePath.search(/[#&]/v);

	// Static path – nothing to trim
	if (dynamicStart === -1) {
		return templatePath;
	}

	// Wind the path back to the last slash before the dynamic part
	const lastSlashPos = templatePath.lastIndexOf('/', dynamicStart);

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
 * Determines whether namespace prefix usages should be collated for a line.
 * They are ignored in XML files and on `@usage` doc lines with code snippets.
 *
 * @param {string} line The line to check
 *
 * @returns {boolean} Whether the line's prefix usages should be ignored
 */
const isPrefixUsageExcluded = (line) => checkIsXMLFile(line) || line.startsWith('@usage');

/**
 * Finds the namespace prefix usages on a line.
 *
 * @param {string} line The line to search
 * @param {number} lineNumber The number of the line within the file
 *
 * @returns {Array<object>} The prefix usages found on the line
 */
const findPrefixUsages = (line, lineNumber) => {
	if (isPrefixUsageExcluded(line)) {
		return [];
	}

	return matchAll(line, /<(?<namespace>[\dA-Za-z]+):/gv).map((match) => ({
		prefix: match.groups.namespace,
		line: lineNumber,
		column: match.index + 1,
	}));
};

/**
 * Checks a single cfimport taglib path, reporting it if it doesn't exist.
 *
 * @param {RegExpExecArray} taglibMatch The regex match which found the taglib path
 * @param {number} lineNumber The number of the line within the file
 * @param {string} fileDirname The directory of the file being analysed
 *
 * @returns {Array<object>} An array of violation objects
 */
const checkTaglibMatch = (taglibMatch, lineNumber, fileDirname) => {
	const taglibPath = resolvePath(taglibMatch.groups.taglib, fileDirname);

	if (existsSync(taglibPath)) {
		return [];
	}

	return [
		createPathViolation(
			taglibMatch,
			lineNumber,
			`cfimport taglib path ${taglibPath} not found`,
		),
	];
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
const checkTaglibPaths = (line, lineNumber, fileDirname) => matchAll(
	line,
	/taglib=["'](?<taglib>[^"']+)["']/gv,
).flatMap((taglibMatch) => checkTaglibMatch(taglibMatch, lineNumber, fileDirname));

/**
 * Finds the cfinclude template paths and cfscript include paths on a line.
 *
 * @param {string} line The line to search
 *
 * @returns {Array<RegExpExecArray>} The include matches found on the line
 */
const findIncludeMatches = (line) => [
	// Checks <cfinclude template="$path" />
	...matchAll(line, /template=["'](?<path>[^"']+)["']/gv),
	// Checks include '$path'; (inside <cfscript>)
	// @TODO fix vulnerable RegExp
	...matchAll(line, /\binclude\s["'](?<path>.*\.cfm)["']/gv),
];

/**
 * Determines whether a path is webroot-virtual, e.g. /missing.cfm, and so can't
 * be resolved against the filesystem.
 *
 * @param {string} templatePath The path to check
 *
 * @returns {boolean} Whether the path is webroot-virtual
 */
const isWebrootPath = (templatePath) => templatePath.startsWith('/');

/**
 * Checks a single include path, reporting it if it doesn't exist.
 *
 * @param {RegExpExecArray} includeMatch The regex match which found the include path
 * @param {number} lineNumber The number of the line within the file
 * @param {string} fileDirname The directory of the file being analysed
 *
 * @returns {Array<object>} An array of violation objects
 */
const checkIncludeMatch = (includeMatch, lineNumber, fileDirname) => {
	// Dynamic path (contains # or &): all we can check is the non-dynamic part
	const templatePath = trimDynamicPath(includeMatch.groups.path);

	if (isWebrootPath(templatePath)) {
		return [];
	}

	// Resolve the templatePath relative to the dirname of the including file
	const resolvedPath = resolvePath(templatePath, fileDirname);

	if (existsSync(resolvedPath)) {
		return [];
	}

	return [
		createPathViolation(
			includeMatch,
			lineNumber,
			`cfinclude/include template path ${resolvedPath} not found`,
		),
	];
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
const checkIncludePaths = (line, lineNumber, fileDirname) => findIncludeMatches(line)
	.flatMap((includeMatch) => checkIncludeMatch(includeMatch, lineNumber, fileDirname));

/**
 * Runs a line checker over every line of a file.
 *
 * @param {Array<string>} lines The lines of the file
 * @param {string} fileDirname The directory of the file being analysed
 * @param {(line: string, lineNumber: number, fileDirname: string) => Array<object>} checkLine The checker to run for each line
 *
 * @returns {Array<object>} An array of violation objects
 */
const collectPathViolations = (lines, fileDirname, checkLine) => lines.flatMap(
	(line, index) => checkLine(line, index + 1, fileDirname),
);

/**
 * Collects the prefixes and prefix usages found across a file's lines.
 *
 * @param {Array<string>} lines The lines of the file
 * @param {(line: string, lineNumber: number) => Array<object>} finder The finder to run for each line
 *
 * @returns {Array<object>} The prefixes found on the lines
 */
const collectPrefixes = (lines, finder) => lines.flatMap(
	(line, index) => finder(line, index + 1),
);

/**
 * Checks a file for missing paths.
 *
 * @param {string} filePath The path of the file to check
 *
 * @returns {Array<object>} An array of violation objects
 */
export const checkFile = (filePath) => {
	const lines = readFile(filePath).split('\n');

	// Cache the dirname of the file being analysed
	const fileDirname = path.dirname(filePath);

	const prefixes = collectPrefixes(lines, findImportedPrefixes);
	const prefixUsages = collectPrefixes(lines, findPrefixUsages);

	return [
		...comparePrefixArrays(
			prefixUsages,
			prefixes,
			'used namespace prefix "{2}" not cfimported',
			'error',
		),
		...comparePrefixArrays(
			prefixes,
			prefixUsages,
			'cfimported namespace prefix "{2}" not used',
			'warning',
		),
		...collectPathViolations(lines, fileDirname, checkIncludePaths),
		...collectPathViolations(lines, fileDirname, checkTaglibPaths),
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
