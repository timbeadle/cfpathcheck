/*global module, require */

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');
var Verbalize = require('verbalize');
var checkstyleFormatter = require('checkstyle-formatter');
var chalk = require('chalk');
var logSymbols = require('log-symbols');
var pathIsAbsolute = require('path-is-absolute');

var log = new Verbalize();

/**
 * Uses lodash isEqual to perform non-strict object comparison.
 *
 * @see http://stackoverflow.com/a/4587130/167987
 * @param {Object} obj - The object to search for.
 * @param {Array} list - The array of objects to search.
 */
function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i += 1) {
		if (_.isEqual(list[i], obj)) {
			return true;
		}
	}

	return false;
}


/**
 * Compares two arrays of cfml taglib prefixes to see if there are any mismatches.
 *
 * @param {Array} prefixArray1 - The first array of taglib prefixes.
 * @param {Array} prefixArray2 - The second array of taglib prefixes.
 * @param {string} message - The message to display in case of a violation.
 * @param {string} severity - The violation severity.
 */
function comparePrefixArrays(prefixArray1, prefixArray2, message, severity) {

	var prefixedViolations = {};
	var prefixManifest = {};
	var violations = [];

	prefixArray1.forEach(function (value) {

		if (!prefixedViolations.hasOwnProperty(value.prefix)) {
			prefixedViolations[value.prefix] = [];
		}

		var formattedMessage = message.replace('{2}', value.prefix);

		prefixArray2.forEach(function (value2) {
			// Key not found

			if (value.prefix !== value2.prefix) {
				// Don't override a true value with false - true is sticky
				if (!prefixManifest.hasOwnProperty(value.prefix) || !prefixManifest[value.prefix]) {
					prefixManifest[value.prefix] = false;
				}
			} else {
				prefixManifest[value.prefix] = true;
			}


			var messageObj = {
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
			var messageObj = {
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
	for (var prefix in prefixManifest) {
		if (prefixManifest.hasOwnProperty(prefix)) {
			if (prefixManifest[prefix]) {
				delete prefixedViolations[prefix];
			} else {
				/*jshint -W083 */
				prefixedViolations[prefix].forEach(function (value) {
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
function matchAll(str, regex) {
	var res = [];
	var m;
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
}


/**
 * @param {string} filePath - The path of the file to check.
 * Checks a file for missing paths.
 */
function checkFile(filePath) {
	var templatePathViolations = [];
	var taglibPathViolations = [];
	var prefixes = [];
	var prefixUsages = [];
	var isXMLFile = false;
	var lineNumber = 1;

	var lines = fs.readFileSync(filePath, 'utf8').replace(/\r\n/, '\n').split('\n');

	// Cache the dirname of the file being analysed
	var fileDirname = path.dirname(filePath);

	lines.forEach(function (line) {
		// console.log('Line from file:', line);

		// Look for XML file signature
		var XMLSearch = line.match(/(<\?xml|type="text\/xml)/);

		if (XMLSearch !== null) {
			isXMLFile = true;
		}

		// Exclude @usage doc lines including code snippets
		var isUsageLine = line.match(/^@usage/) !== null;

		var importSearch = line.match(/prefix=\"([A-Za-z0-9]+)\"/);

		if (importSearch !== null) {
			// console.log(importSearch);
			prefixes.push({
				prefix: importSearch[1],
				line: lineNumber,
				column: importSearch.index + 1
			});
		}

		var namespaceSearch = matchAll(line, /<([A-Za-z0-9]+)\:/g);
		// console.log(namespaceSearch);

		// We're outputting an XML file - don't attempt to collate namespace prefix usages
		if (!isXMLFile && !isUsageLine) {
			namespaceSearch.forEach(function (value) {
				prefixUsages.push({
					prefix: value[1],
					line: lineNumber,
					column: value.index + 1
				});
			});
		}

		var taglibMatches = matchAll(line, /taglib=\"([^"]+)\"/g);

		taglibMatches.forEach(function (taglibMatch) {
			var taglibPath = taglibMatch[1];
			if (!pathIsAbsolute(taglibPath)) {
				taglibPath = path.resolve(fileDirname, taglibPath);
			}
			if (!fs.existsSync(taglibPath)) {
				taglibPathViolations.push({
					line: lineNumber,
					column: taglibMatch.index + 1,
					message: 'cfimport taglib path {1} not found'.replace('{1}', taglibPath),
					severity: 'error'
				});
			}
		});

		// <cfinclude template="$path" />
		var cfIncludeMatches = matchAll(line, /template=\"([^"]+)\"/g);

		// include '$path'; (inside <cfscript>)
		var includeMatches = matchAll(line, /\binclude\s['"](.*\.cfm)['"]/g);

		cfIncludeMatches.concat(includeMatches).forEach(function (includeMatch) {
			// console.log(includeMatch);

			// Dynamic path (contains #): all we can check is the non-dynamic part
			var templatePath = includeMatch[1];
			var hashPos = templatePath.indexOf('#');
			if (hashPos !== -1) {
				templatePath = path.dirname(templatePath.substr(0, hashPos));
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
						message: 'cfinclude/include template path {1} not found'.replace('{1}', templatePath),
						severity: 'error'
					});
				}

			}


		});

		lineNumber += 1;

	});



	var unusedPrefixViolations = comparePrefixArrays(prefixes, prefixUsages, 'cfimported namespace prefix "{2}" not used', 'warning');
	var unimportedPrefixViolations = comparePrefixArrays(prefixUsages, prefixes, 'used namespace prefix "{2}" not cfimported', 'error');

	var violations = unimportedPrefixViolations.concat(
		unusedPrefixViolations,
		templatePathViolations,
		taglibPathViolations
	);

	return violations;
}

module.exports = {

	/**
	 * @param {string} filePath - The full path of the file to check.
	 */
	check: function check(filePath) {
		var fileNames = [];
		var violations = [];

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
				fileNames = glob.sync(filePath + '**/*.cfm', {
					ignore: [
						'**/WEB-INF/**',
						'**/node_modules/**'
					]
				});
			} catch (e) {
				// ...if that fails, it's a file, not a directory
				fileNames = [filePath];
			}
		}

		// console.log(fileNames);

		// Loop over our file list, checking each file
		fileNames.forEach(function (fileName) {
			var fileViolations = checkFile(fileName);
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
	formatter: function formatter(violations, format) {
		var output;
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
	writeFile: function writeFile(output, outFile) {
		// Resolve the path if it's not absolute
		if (!pathIsAbsolute(outFile)) {
			outFile = path.resolve(outFile);
		}

		// Warn that the target directory doesn't exist
		if (!fs.existsSync(path.dirname(outFile))) {
			// fs.mkdirSync(path.dirname(outFile));
			log.warn('Cannot write ' + outFile +  '. Destination directory doesn\'t exist');
		} else {
			fs.writeFileSync(outFile, output, 'utf8');
		}
	},


	/**
	 * @param {string|Array} output - The output to write.
	 */
	writeOutput: function writeOutput(output) {
		if (output instanceof Array) {
			output.forEach(function (violation) {

				log.writeln('File: ' + chalk.green(violation.filename));
				violation.messages.forEach(function (message) {
					var messageText = 'L' + message.line + ':' + message.column + ' - ' + message.message;
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
