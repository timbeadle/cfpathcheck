import path from 'node:path';
import deepEqual from 'deep-equal';

/**
 * Uses deep-equal to perform non-strict object comparison.
 *
 * @param {object} targetObject The object to search for.
 * @param {Array<object>} list The array of objects to search.
 *
 * @returns {boolean} Whether the array contains the object.
 */
export const containsObject = (targetObject, list) => list.some((item) => deepEqual(item, targetObject));

/**
 * Determines if a file looks like it is an XML file
 *
 * @param {string} line The file line to check for an XML file prolog.
 *
 * @returns {boolean} Whether the file appears to be an XML file or not.
 */
export const checkIsXMLFile = (line) => {
	const regexp = /<\?xml|type="text\/xml/v;
	const xmlSearch = line.match(regexp);

	return xmlSearch !== null;
};

/**
 * Finds all RegExp pattern matches in a string.
 *
 * @param {string} matchString The string to match
 * @param {RegExp} regex The RegExp to use
 *
 * @returns {RegExpExecArray|Array} The match result array
 */
export const matchAll = (matchString, regex) => {
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

/**
 * Normalises a file path, resolving it if it is not absolute.
 *
 * @param {string} filePath - The path to normalise
 *
 * @returns {string} The normalised file path
 */
export const normalisePath = (filePath) => {
	// Resolve the path, if a relative path was passed in
	if (!path.isAbsolute(filePath)) {
		filePath = path.resolve(filePath);
	}

	return filePath;
};
