/*global module, require */

'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const Verbalize = require('verbalize');
const checkstyleFormatter = require('checkstyle-formatter');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const pathIsAbsolute = require('path-is-absolute');

const log = new Verbalize();

/**
 * Uses lodash isEqual to perform non-strict object comparison.
 *
 * @see http://stackoverflow.com/a/4587130/167987
 * @param {Object} obj - The object to search for.
 * @param {Array} list - The array of objects to search.
 */
const containsObject = (obj, list) => {
	for (let i = 0; i < list.length; i += 1) {
		if (_.isEqual(list[i], obj)) {
			return true;
		}
	}

	return false;
};

/**
 * Compares two arrays of cfml taglib prefixes to see if there are any mismatches.
 *
 * @param {Array} prefixArray1 - The first array of taglib prefixes.
 * @param {Array} prefixArray2 - The second array of taglib prefixes.
 * @param {string} message - The message to display in case of a violation.
 * @param {string} severity - The violation severity.
 */
const comparePrefixArrays = (prefixArray1, prefixArray2, message, severity) => {
	const prefixedViolations = {};
	const prefixManifest = {};
	const violations = [];

	prefixArray1.forEach((value) => {
		if (!prefixedViolations.hasOwnProperty(value.prefix)) {
			prefixedViolations[value.prefix] = [];
		}

		const formattedMessage = message.replace('{2}', value.prefix);

		prefixArray2.forEach((value2) => {
			// Key not found

			if (value.prefix !== value2.prefix) {
				// Don't override a true value with false - true is sticky
				if (!prefixManifest.hasOwnProperty(value.prefix) ||
					!prefixManifest[value.prefix]
				) {
					prefixManifest[value.prefix] = false;
				}
			} else {
				prefixManifest[value.prefix] = true;
			}

			const messageObj = {
				line: value.line,
				column: value.column || 1,
				message: formattedMessage,
				severity: severity
			};

			// console.log(prefixedViolations[value.prefix]);

			if (!containsObject(messageObj, prefixedViolations[value.prefix])) {
				prefixedViolations[value.prefix].push(messageObj);
			}
		});

		if (prefixArray2.length === 0) {
			prefixManifest[value.prefix] = false;
			const messageObj = {
				line: value.line,
				column: value.column || 1,
				message: formattedMessage,
				severity: severity
			};
			if (!containsObject(messageObj, prefixedViolations[value.prefix])) {
				prefixedViolations[value.prefix].push(messageObj);
			}
		}
	});

	// Delete the array of messages for prefix keys that *were* found
	for (const prefix in prefixManifest) {
		if (prefixManifest.hasOwnProperty(prefix)) {
			if (prefixManifest[prefix]) {
				delete prefixedViolations[prefix];
			} else {
				prefixedViolations[prefix].forEach((value) => {
					violations.push(value);
				});
			}
		}
	}

	return violations;
}

/**
 * @param {string} str - The string to match.
 * @param {RegExp} regex - The RegExp to use.
 */
const matchAll = (str, regex) => {
	const res = [];
	let m;
	if (regex.global) {
		while ((m = regex.exec(str))) {
			res.push(m);
		}
	} else {
		if ((m = regex.exec(str))) {
			res.push(m);
		}
	}
	return res;
};

/**
 * @param {string} filePath - The path of the file to check.
 * Checks a file for missing paths.
 */
const checkFile = (filePath) => {
	const templatePathViolations = [];
	const taglibPathViolations = [];
	const prefixes = [];
	const prefixUsages = [];
	let isXMLFile = false;
	let lineNumber = 1;

	const lines = fs
		.readFileSync(filePath, 'utf8')
		.replace(/\r\n/, '\n')
		.split('\n');

	// Cache the dirname of the file being analysed
	const fileDirname = path.dirname(filePath);

	lines.forEach((line) => {
		// console.log('Line from file:', line);

		// Look for XML file signature
		const XMLSearch = line.match(/(<\?xml|type="text\/xml)/);

		if (XMLSearch !== null) {
			isXMLFile = true;
		}

		// Exclude @usage doc lines including code snippets
		const isUsageLine = line.match(/^@usage/) !== null;

		const importSearch = line.match(/prefix=["']([A-Za-z0-9]+)["']/);

		if (importSearch !== null) {
			// console.log(importSearch);
			prefixes.push({
				prefix: importSearch[1],
				line: lineNumber,
				column: importSearch.index + 1
			});
		}

		const namespaceSearch = matchAll(line, /<([A-Za-z0-9]+):/g);
		// console.log(namespaceSearch);

		// We're outputting an XML file - don't attempt to collate namespace prefix usages
		if (!isXMLFile && !isUsageLine) {
			namespaceSearch.forEach((value) => {
				prefixUsages.push({
					prefix: value[1],
					line: lineNumber,
					column: value.index + 1
				});
			});
		}

		const taglibMatches = matchAll(line, /taglib=["']([^"']+)["']/g);

		taglibMatches.forEach((taglibMatch) => {
			let taglibPath = taglibMatch[1];
			if (!pathIsAbsolute(taglibPath)) {
				taglibPath = path.resolve(fileDirname, taglibPath);
			}
			if (!fs.existsSync(taglibPath)) {
				taglibPathViolations.push({
					line: lineNumber,
					column: taglibMatch.index + 1,
					message: `cfimport taglib path ${taglibPath} not found`,
					severity: 'error'
				});
			}
		});

		// <cfinclude template="$path" />
		const cfIncludeMatches = matchAll(line, /template=["']([^"']+)["']/g);

		// include '$path'; (inside <cfscript>)
		const includeMatches = matchAll(line, /\binclude\s['"](.*\.cfm)['"]/g);

		cfIncludeMatches.concat(includeMatches).forEach((includeMatch) => {
			// console.log(includeMatch);

			// Dynamic path (contains # or &): all we can check is the non-dynamic part,
			// wound back to the last slash
			let templatePath = includeMatch[1];
			const hashPos = templatePath.indexOf('#');
			const ampersandPos = templatePath.indexOf('&');
			if (hashPos !== -1 || ampersandPos !== -1) {
				const searchPos = hashPos !== -1 ? hashPos : ampersandPos;
				const lastSlashPos = templatePath.lastIndexOf('/', searchPos);
				templatePath = path.dirname(templatePath.substr(0, lastSlashPos));
			}

			// Can't work with webroot-virtual paths, e.g. /missing.cfm
			if (templatePath.substr(0, 1) !== '/') {
				if (!pathIsAbsolute(templatePath)) {
					// Resolve the templatePath relative to the dirname of the including file
					templatePath = path.resolve(fileDirname, templatePath);
				}

				if (!fs.existsSync(templatePath)) {
					templatePathViolations.push({
						line: lineNumber,
						column: includeMatch.index + 1,
						message: `cfinclude/include template path ${templatePath} not found`,
						severity: 'error'
					});
				}
			}
		});

		lineNumber += 1;
	});

	const unusedPrefixViolations = comparePrefixArrays(
		prefixes,
		prefixUsages,
		'cfimported namespace prefix "{2}" not used',
		'warning'
	);

	const unimportedPrefixViolations = comparePrefixArrays(
		prefixUsages,
		prefixes,
		'used namespace prefix "{2}" not cfimported',
		'error'
	);

	const violations = unimportedPrefixViolations.concat(
		unusedPrefixViolations,
		templatePathViolations,
		taglibPathViolations
	);

	return violations;
};

module.exports = {
	/**
	 * @param {string} filePath - The full path of the file to check.
	 */
	check: (filePath) => {
		let fileNames = [];
		const violations = [];

		// Resolve the path, if a relative path was passed in
		if (!pathIsAbsolute(filePath)) {
			filePath = path.resolve(filePath);
		}

		// The path exists...
		if (fs.existsSync(filePath)) {
			try {
				// ...try a readdirSync and...
				fs.readdirSync(filePath);

				// (Add a trailing slash if not present)
				if (filePath.substr(-1) !== '/') {
					filePath += '/';
				}
				fileNames = glob.sync(`${filePath}**/*.cfm`, {
					ignore: ['**/WEB-INF/**', '**/node_modules/**']
				});
			} catch (e) {
				// ...if that fails, it's a file, not a directory
				fileNames = [filePath];
			}
		}

		// console.log(fileNames);

		// Loop over our file list, checking each file
		fileNames.forEach((fileName) => {
			const fileViolations = checkFile(fileName);
			// console.log(fileViolations);
			if (fileViolations.length > 0) {
				violations.push({
					filename: fileName,
					messages: fileViolations
				});
			}
		});

		// console.log(violations);

		return violations;
	},

	/**
	 * @param {Array} violations - The violations array.
	 * @param {string} format - The output format to use.
	 */
	formatter: (violations, format) => {
		let output;
		if (format === 'checkstyle') {
			output = checkstyleFormatter(violations);
		} else {
			output = violations;
		}
		return output;
	},

	/**
	 * @param {string} output - The file contents to write.
	 * @param {string} outFile - The file to write to.
	 */
	writeFile: (output, outFile) => {
		// Resolve the path if it's not absolute
		if (!pathIsAbsolute(outFile)) {
			outFile = path.resolve(outFile);
		}

		// Warn that the target directory doesn't exist
		if (!fs.existsSync(path.dirname(outFile))) {
			// fs.mkdirSync(path.dirname(outFile));
			log.warn(
				`Cannot write ${outFile}. Destination directory doesn't exist`
			);
		} else {
			fs.writeFileSync(outFile, output, 'utf8');
		}
	},

	/**
	 * @param {string|Array} output - The output to write.
	 */
	writeOutput: (output) => {
		if (output instanceof Array) {
			output.forEach((violation) => {
				log.writeln(`File: ${chalk.green(violation.filename)}`);
				violation.messages.forEach((message) => {
					let messageText = `L${message.line}:${message.column} - ${message.message}`;
					if (message.severity === 'error') {
						messageText = chalk.red(messageText);
					} else if (message.severity === 'warning') {
						messageText = chalk.yellow(messageText);
					}

					log.writeln('  ', logSymbols[message.severity], messageText);
				});
			});
		} else {
			log.writeln(output);
		}
	}
};
