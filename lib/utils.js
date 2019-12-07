const _ = require('lodash');

/**
 * Uses lodash isEqual to perform non-strict object comparison.
 *
 * @see https://stackoverflow.com/a/4587130/167987
 * @param {object} obj - The object to search for.
 * @param {Array} list - The array of objects to search.
 */
const containsObject = (obj, list) => {
	for (const element of list) {
		if (_.isEqual(element, obj)) {
			return true;
		}
	}

	return false;
};

/**
 * @param {string} line - The file line to check for an XML file prolog.
 */
const checkIsXMLFile = (line) => {
	const XMLSearch = line.match(/(<\?xml|type="text\/xml)/);
	let isXMLFile = false;
	if (XMLSearch !== null) {
		isXMLFile = true;
	}

	return isXMLFile;
};

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
	} else if ((m = regex.exec(str))) {
		res.push(m);
	}

	return res;
};

module.exports = {
	checkIsXMLFile,
	containsObject,
	matchAll,
};
