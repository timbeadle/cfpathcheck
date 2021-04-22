import deepEqual from 'deep-equal';

/**
 * Uses deep-equal to perform non-strict object comparison.
 *
 * @param {object} targetObject - The object to search for.
 * @param {Array} list - The array of objects to search.
 */
export const containsObject = (targetObject, list) => {
	return list.some(item => deepEqual(item, targetObject));
}

/**
 * @param {string} line - The file line to check for an XML file prolog.
 */
export const checkIsXMLFile = (line) => {
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
