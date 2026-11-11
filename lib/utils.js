import path from 'node:path';
import deepEqual from 'deep-equal';

const XML_FILE_REGEXP = /<\?xml|type="text\/xml/v;

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
	const xmlSearch = line.match(XML_FILE_REGEXP);

	return xmlSearch !== null;
};

/**
 * Finds the first match of a non-global RegExp in a string.
 *
 * @param {string} matchString The string to match
 * @param {RegExp} regex The RegExp to use
 *
 * @returns {Array<RegExpExecArray>} The match result array
 */
const findFirstMatch = (matchString, regex) => {
	const match = regex.exec(matchString);

	return match === null ? [] : [match];
};

/**
 * Finds all RegExp pattern matches in a string.
 *
 * @param {string} matchString The string to match
 * @param {RegExp} regex The RegExp to use
 *
 * @returns {Array<RegExpExecArray>} The match result array
 */
export const matchAll = (matchString, regex) => (regex.global
	? matchString.matchAll(regex).toArray()
	: findFirstMatch(matchString, regex));

/**
 * Normalises a file path, resolving it if it is not absolute.
 *
 * @param {string} filePath - The path to normalise
 *
 * @returns {string} The normalised file path
 */
export const normalisePath = (filePath) => (path.isAbsolute(filePath)
	? filePath
	: path.resolve(filePath));
