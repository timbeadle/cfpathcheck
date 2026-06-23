import chalk from 'chalk';
import checkstyleFormatter from 'checkstyle-formatter';
import logSymbols from 'log-symbols';

const LINE_SYMBOL = 'L';
const COLUMN_SYMBOL = ':';
const MESSAGE_SEPARATOR = ' - ';

/**
 * Formats a message
 *
 * @param {object} message The message to format
 *
 * @returns {string} The formatted message
 */
export const formatMessageText = (message) => {
	let messageText = `${LINE_SYMBOL}${message.line}${COLUMN_SYMBOL}${message.column}${MESSAGE_SEPARATOR}${message.message}`;

	if (message.severity === 'error') {
		messageText = chalk.red(messageText);
	} else if (message.severity === 'warning') {
		messageText = chalk.yellow(messageText);
	}

	return messageText;
};

/**
 * The main formatter method
 *
 * @param {Array<object>} violations - The violations array.
 * @param {string} format - The output format to use.
 *
 * @returns {string|Array<object>} The formatted violations as a string, or the violations array
 */
export const formatter = (violations, format) => format === 'checkstyle'
	? checkstyleFormatter(violations)
	: violations;

/**
 * Writes output to console.log
 *
 * @param {string|Array<object>} output - The output to write.
 */
export const writeOutput = (output) => {
	if (Array.isArray(output)) {
		for (const violation of output) {
			console.log(`File: ${chalk.green(violation.filename)}`);
			for (const message of violation.messages) {
				console.log('  ', logSymbols[message.severity], formatMessageText(message));
			}
		}
	} else {
		console.log(output);
	}
};
