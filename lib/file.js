import {
	existsSync, readdirSync, readFileSync, writeFileSync,
} from 'fs';
import { sync } from 'glob';
import path from 'path';
import { normalisePath } from './utils.js';

/**
 * Gets a list of files from a given path.
 *
 * @param {string} filePath
 *
 * @returns {Array<string>}
 */
export const getFiles = (filePath) => {
	let fileNames = [];

	filePath = normalisePath(filePath);

	// The path exists...
	if (existsSync(filePath)) {
		try {
			// ...try a readdirSync and...
			readdirSync(filePath);

			// (Add a trailing slash if not present)
			if (filePath.slice(-1) !== '/') {
				filePath += '/';
			}

			fileNames = sync(`${filePath}**/*.cfm`, {
				ignore: ['**/WEB-INF/**', '**/node_modules/**'],
			});
		} catch {
			// ...if that fails, it's a file, not a directory
			fileNames = [filePath];
		}
	}

	return fileNames;
};

/**
* Reads a file from the filesystem and normalises its line endings.
*
* @param {string} filePath
* @returns {string}
*/
export const readFile = (filePath) => readFileSync(filePath, 'utf8').replace(/\r\n/, '\n');

/**
 * @param {string} output - The file contents to write.
 * @param {string} outFile - The file to write to.
 */
export const writeFile = (output, outFile) => {
	// Resolve the path if it's not absolute
	if (!path.isAbsolute(outFile)) {
		outFile = path.resolve(outFile);
	}

	// Warn that the target directory doesn't exist
	if (existsSync(path.dirname(outFile))) {
		writeFileSync(outFile, output, 'utf8');
	} else {
		console.warn(`Cannot write ${outFile}. Destination directory doesn't exist`);
	}
};
