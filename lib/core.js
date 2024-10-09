import { existsSync } from 'node:fs';
import path from 'node:path';
import { getFiles, readFile } from './file.js';
import {
	containsObject, checkIsXMLFile, matchAll,
} from './utils.js';

/**
 * Compares two arrays of cfml taglib prefixes to see if there are any mismatches.
 *
 * @param {Array<string>} prefixArray1 - The first array of taglib prefixes.
 * @param {Array<string>} prefixArray2 - The second array of taglib prefixes.
 * @param {string} message - The message to display in case of a violation.
 * @param {string} severity - The violation severity.
 *
 * @returns {Array<object>}
 */
export const comparePrefixArrays = (prefixArray1, prefixArray2, message, severity) => {
	const prefixedViolations = {};
	const prefixManifest = {};
	const violations = [];

	for (const value of prefixArray1) {
		if (
			!Object.hasOwn(prefixedViolations, value.prefix)
		) {
			prefixedViolations[value.prefix] = [];
		}

		const formattedMessage = message.replace('{2}', value.prefix);

		for (const value2 of prefixArray2) {
			// Key not found

			if (value.prefix === value2.prefix) {
				prefixManifest[value.prefix] = true;
			} else if (
				!Object.hasOwn(prefixManifest, value.prefix)
				|| !prefixManifest[value.prefix]
			) {
				// Don't override a true value with false - true is sticky
				prefixManifest[value.prefix] = false;
			}

			const messageObject = {
				line: value.line,
				column: value.column || 1,
				message: formattedMessage,
				severity,
			};

			if (!containsObject(messageObject, prefixedViolations[value.prefix])) {
				prefixedViolations[value.prefix].push(messageObject);
			}
		}

		if (prefixArray2.length === 0) {
			prefixManifest[value.prefix] = false;
			const messageObject = {
				line: value.line,
				column: value.column || 1,
				message: formattedMessage,
				severity,
			};
			if (!containsObject(messageObject, prefixedViolations[value.prefix])) {
				prefixedViolations[value.prefix].push(messageObject);
			}
		}
	}

	// Delete the array of messages for prefix keys that *were* found
	for (const prefix in prefixManifest) {
		if (Object.hasOwn(prefixManifest, prefix)) {
			if (prefixManifest[prefix]) {
				delete prefixedViolations[prefix];
			} else {
				for (const value of prefixedViolations[prefix]) {
					violations.push(value);
				}
			}
		}
	}

	return violations;
};

/**
 * Checks a file for missing paths.
 *
 * @param {string} filePath - The path of the file to check.
 *
 * @returns {Array<object>}
 */
export const checkFile = (filePath) => {
	const templatePathViolations = [];
	const taglibPathViolations = [];
	const prefixes = [];
	const prefixUsages = [];
	let isXMLFile = false;
	let lineNumber = 1;

	const lines = readFile(filePath).split('\n');

	// Cache the dirname of the file being analysed
	const fileDirname = path.dirname(filePath);

	for (const line of lines) {
		isXMLFile = checkIsXMLFile(line);

		// Exclude @usage doc lines including code snippets
		const isUsageLine = line.startsWith('@usage');

		const importSearch = line.match(/prefix=["'](?<import>[A-Za-z\d]+)["']/);

		if (importSearch !== null) {
			prefixes.push({
				prefix: importSearch.groups.import,
				line: lineNumber,
				column: importSearch.index + 1,
			});
		}

		const namespaceSearch = matchAll(line, /<(?<namespace>[A-Za-z\d]+):/g);

		// We're outputting an XML file - don't attempt to collate namespace prefix usages
		if (!isXMLFile && !isUsageLine) {
			for (const value of namespaceSearch) {
				prefixUsages.push({
					prefix: value.groups.namespace,
					line: lineNumber,
					column: value.index + 1,
				});
			}
		}

		const taglibMatches = matchAll(line, /taglib=["'](?<taglib>[^"']+)["']/g);

		for (const taglibMatch of taglibMatches) {
			let taglibPath = taglibMatch.groups.taglib;
			if (!path.isAbsolute(taglibPath)) {
				taglibPath = path.resolve(fileDirname, taglibPath);
			}

			if (!existsSync(taglibPath)) {
				taglibPathViolations.push({
					line: lineNumber,
					column: taglibMatch.index + 1,
					message: `cfimport taglib path ${taglibPath} not found`,
					severity: 'error',
				});
			}
		}

		// Checks <cfinclude template="$path" />
		const cfIncludeMatches = matchAll(line, /template=["'](?<path>[^"']+)["']/g);

		// Checks include '$path'; (inside <cfscript>)
		// @TODO fix vulnerable RegExp
		const includeMatches = matchAll(line, /\binclude\s['"](?<path>.*\.cfm)['"]/g);

		for (const includeMatch of [...cfIncludeMatches, ...includeMatches]) {
			// Dynamic path (contains # or &): all we can check is the non-dynamic part,
			// wound back to the last slash
			let templatePath = includeMatch.groups.path;
			const hashPos = templatePath.indexOf('#');
			const ampersandPos = templatePath.indexOf('&');
			if (hashPos !== -1 || ampersandPos !== -1) {
				const searchPos = hashPos === -1 ? ampersandPos : hashPos;
				const lastSlashPos = templatePath.lastIndexOf('/', searchPos);
				templatePath = path.dirname(templatePath.slice(0, lastSlashPos));
			}

			// Can't work with webroot-virtual paths, e.g. /missing.cfm
			if (templatePath.slice(0, 1) !== '/') {
				if (!path.isAbsolute(templatePath)) {
					// Resolve the templatePath relative to the dirname of the including file
					templatePath = path.resolve(fileDirname, templatePath);
				}

				if (!existsSync(templatePath)) {
					templatePathViolations.push({
						line: lineNumber,
						column: includeMatch.index + 1,
						message: `cfinclude/include template path ${templatePath} not found`,
						severity: 'error',
					});
				}
			}
		}

		lineNumber += 1;
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
 * @param {string} filePath - The full path of the file to check.
 *
 * @returns {Array<object>}
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
