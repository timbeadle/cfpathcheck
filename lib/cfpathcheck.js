var fs = require('fs');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');


/**
 * @see http://stackoverflow.com/a/4587130/167987
 * Uses lodash isEqual to perform non-strict object comparison
 */
function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (_.isEqual(list[i], obj)) {
			return true;
		}
	}

	return false;
}


function comparePrefixArrays(prefixArray1, prefixArray2, message) {

	var prefixedViolations = {};
	var prefixManifest = {};
	var violations = [];

	prefixArray1.forEach(function(value) {

		if (!prefixedViolations.hasOwnProperty(value.prefix)) {
			prefixedViolations[value.prefix] = [];
		}

		prefixArray2.forEach(function(value2) {
			// Key not found
			var formattedMessage = message.replace('{2}', value.prefix);

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
				severity: value2.severity
			};

			// console.log(prefixedViolations[value.prefix]);

			if (!containsObject(messageObj, prefixedViolations[value.prefix])) {
				prefixedViolations[value.prefix].push(messageObj);
			}

		});

	});

	// Delete the array of messages for prefix keys that *were* found
	for (var prefix in prefixManifest) {
		if (prefixManifest.hasOwnProperty(prefix)) {
			if (prefixManifest[prefix]) {
				delete prefixedViolations[prefix];
			} else {
				prefixedViolations[prefix].forEach(function(value) {
					violations.push(value);
				});
			}
		}
	}

	return violations;

}

function matchAll(str, regex) {
	var res = [];
	var m;
	if (regex.global) {
		while (m = regex.exec(str)) {
			res.push(m);
		}
	} else {
		if (m = regex.exec(str)) {
			res.push(m);
		}
	}
	return res;
}

function checkFile(filePath) {
	var templatePathViolations = [];
	var prefixes = [];
	var prefixUsages = [];
	var lineNumber = 1;

	var lines = fs.readFileSync(filePath, 'utf8').replace(/\r\n/, '\n').split('\n');

	lines.forEach(function(line) {
		// console.log('Line from file:', line);
		var importSearch = line.match(/prefix=\"([A-Za-z0-9]+)\"/);

		if (importSearch !== null) {
			// console.log(importSearch);
			prefixes.push({
				prefix: importSearch[1],
				line: lineNumber,
				column: importSearch.index + 1,
				severity: 'error'
			});
		}

		var namespaceSearch = matchAll(line, /<([A-Za-z0-9]+)\:/g);

		if (namespaceSearch.length > 0) {
			// console.log(namespaceSearch);
			namespaceSearch.forEach(function(value) {
				prefixUsages.push({
					prefix: value[1],
					line: lineNumber,
					column: value.index + 1,
					severity: 'warning'
				});
			});
		}

		// var includeMatches = matchAll(line, /template=\"([._-A-Za-z0-9]+)\"/g);
		var includeMatches = matchAll(line, /template=\"(.+)\"/g);
		includeMatches.forEach(function(includeMatch) {
			// console.log(includeMatch);

			// Dynamic path (contains #): all we can check is the non-dynamic part
			var templatePath = includeMatch[1];
			var hashPos = templatePath.indexOf('#');
			if (hashPos !== -1) {
				templatePath = templatePath.substr(0, hashPos);
			}

			// Can't work with webroot-virtual paths, e.g. /missing.cfm
			if (templatePath.substr(0, 1) !== '/') {

				if (!path.isAbsolute(templatePath)) {
					// Resolve the templatePath relative to the dirname of the including file
					templatePath = path.resolve(path.dirname(filePath), templatePath);
				}

				if (!fs.existsSync(templatePath)) {
					templatePathViolations.push({
						line: lineNumber,
						column: includeMatch.index,
						message: 'cfinclude template path {1} not found'.replace('{1}', templatePath),
						severity: 'error'
					});
				}

			}


		});

		lineNumber += 1;

	});

	var unusedPrefixViolations = comparePrefixArrays(prefixes, prefixUsages, 'cfimported namespace prefix "{2}" not used');
	var unimportedPrefixViolations = comparePrefixArrays(prefixUsages, prefixes, 'used namespace prefix "{2}" not cfimported');

	var violations = unimportedPrefixViolations.concat(
		unusedPrefixViolations,
		templatePathViolations
	);

	return violations;
}

module.exports = {

	check: function check(filePath, format) {
		var fileNames = [];
		var violations = [];

		format = format || 'dump'; // Not relevant in node...


		// Resolve the path, if a relative path was passed in
		if (!path.isAbsolute(filePath)) {
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
				fileNames = glob.sync(filePath + '**/*.cfm');
			} catch (e) {
				// ...if that fails, it's a file, not a directory
				fileNames = [filePath];
			}
		}

		// console.log(fileNames);

		// Loop over our file list, checking each file
		fileNames.forEach(function(fileName) {
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

	}

};
