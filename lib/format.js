import chalk from 'chalk';
import checkstyleFormatter from 'checkstyle-formatter';
import logSymbols from 'log-symbols';

const LINE_SYMBOL = 'L';
const COLUMN_SYMBOL = ':';
const MESSAGE_SEPARATOR = ' - ';

const SEVERITY_COLOURS = new Map([
	['error', chalk.red],
	['warning', chalk.yellow],
]);

/**
 * Formats a message
 *
 * @param {object} message The message to format
 *
 * @returns {string} The formatted message
 */
export const formatMessageText = (message) => {
	const messageText = `${LINE_SYMBOL}${message.line}${COLUMN_SYMBOL}${message.column}${MESSAGE_SEPARATOR}${message.message}`;
	const colour = SEVERITY_COLOURS.get(message.severity);

	return colour ? colour(messageText) : messageText;
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
 * Writes a single violation message to the console.
 *
 * @param {object} message The message to write.
 */
const writeMessage = (message) => {
	console.log('  ', logSymbols[message.severity], formatMessageText(message));
};

/**
 * Writes a file's violations to the console.
 *
 * @param {object} violation The violations reported for a file.
 */
const writeViolation = (violation) => {
	console.log(`File: ${chalk.green(violation.filename)}`);

	for (const message of violation.messages) {
		writeMessage(message);
	}
};

/**
 * Writes output to console.log
 *
 * @param {string|Array<object>} output - The output to write.
 */
export const writeOutput = (output) => {
	if (!Array.isArray(output)) {
		console.log(output);
		return;
	}

	for (const violation of output) {
		writeViolation(violation);
	}
};
