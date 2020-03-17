const _ = require('lodash');

/**
 * Uses lodash isEqual to perform non-strict object comparison.
 *
 * @see https://stackoverflow.com/a/4587130/167987
 * @param {object} targetObject - The object to search for.
 * @param {Array} list - The array of objects to search.
 */
const containsObject = (targetObject, list) => {
	for (const element of list) {
		if (_.isEqual(element, targetObject)) {
			return true;
		}
	}

	return false;
};

/**
 * @param {string} line - The file line to check for an XML file prolog.
 */
const checkIsXMLFile = (line) => {
	const regexp = /<\?xml|type="text\/xml/;
	const xmlSearch = line.match(regexp);

	if (xmlSearch === null) {
		return false;
	}

	return true;
};

/**
 * @param {string} matchString - The string to match.
 * @param {RegExp} regex - The RegExp to use.
 */
const matchAll = (matchString, regex) => {
	const result = [];
	let m;
	if (regex.global) {
		while ((m = regex.exec(matchString))) {
			result.push(m);
		}
	} else if ((m = regex.exec(matchString))) {
		result.push(m);
	}

	return result;
};

module.exports = {
	checkIsXMLFile,
	containsObject,
	matchAll,
};
