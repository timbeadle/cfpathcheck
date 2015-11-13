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
				line: value2.line,
				column: value2.column || 1,
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
	var violations = [];
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

		lineNumber += 1;

	});

	var unusedPrefixViolations = comparePrefixArrays(prefixes, prefixUsages, 'cfimported namespace prefix "{2}" not used');
	var unimportedPrefixViolations = comparePrefixArrays(prefixUsages, prefixes, 'used namespace prefix "{2}" not cfimported');

	violations = unimportedPrefixViolations.concat(unusedPrefixViolations);

	return violations;
}

module.exports = {

	check: function check(filePath, format) {
		var fileList = [];
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
				fileList = glob.sync(filePath + '**/*.cfm');
			} catch (e) {
				// ...if that fails, it's a file, not a directory
				fileList = [filePath];
			}
		}

		// console.log(fileList);

		// Loop over our file list, checking each file
		fileList.forEach(function(value) {
			var fileViolations = checkFile(value);
			// console.log(fileViolations);
			if (fileViolations.length > 0) {
				violations.push({
					filename: value,
					messages: fileViolations
				});
			}
		});

		// console.log(violations);

		return violations;

	}

};
