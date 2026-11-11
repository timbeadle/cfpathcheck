import {
	existsSync,
	readFileSync,
	statSync,
	writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { sync } from 'glob';
import { normalisePath } from './utils.js';

/**
 * Determines whether a path refers to a directory.
 *
 * @param {string} filePath The path to check
 *
 * @returns {boolean} Whether the path is a directory
 */
const isDirectory = (filePath) => {
	const stats = statSync(filePath, { throwIfNoEntry: false });

	return stats?.isDirectory() ?? false;
};

/**
 * Finds all `.cfm` files beneath a directory.
 *
 * @param {string} directoryPath The directory to search
 *
 * @returns {Array<string>} An array of matching file paths
 */
const findCfmFiles = (directoryPath) => sync(path.join(directoryPath, '**/*.cfm'), {
	ignore: ['**/WEB-INF/**', '**/node_modules/**'],
});

/**
 * Gets a list of files from a given path.
 *
 * @param {string} filePath The path to the directory or file to get
 *
 * @returns {Array<string>} An array of file paths
 */
export const getFiles = (filePath) => {
	filePath = normalisePath(filePath);

	if (!existsSync(filePath)) {
		return [];
	}

	return isDirectory(filePath) ? findCfmFiles(filePath) : [filePath];
};

/**
* Reads a file from the filesystem and normalises its line endings.
*
* @param {string} filePath The path to the file to read
* @returns {string} The file contents as a string
*/
export const readFile = (filePath) => readFileSync(filePath, 'utf8').replace(/\r\n/v, '\n');

/**
 * Writes a file to the filesystem.
 *
 * @param {string} output The file contents to write
 * @param {string} outFile The file to write to
 */
export const writeFile = (output, outFile) => {
	outFile = normalisePath(outFile);

	// Warn that the target directory doesn't exist
	if (!existsSync(path.dirname(outFile))) {
		console.warn(`Cannot write ${outFile}. Destination directory doesn't exist`);

		return;
	}

	writeFileSync(outFile, output, 'utf8');
};
