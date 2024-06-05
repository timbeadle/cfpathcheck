#!/usr/bin/env node

import minimist from 'minimist';
import {
	check, formatter, writeOutput, writeFile,
} from '../lib/cfpathcheck.js';

const argv = minimist(process.argv.slice(2));
/**
 * Everything in the file should be customized.
 */

// Use `-f` or `--file` to specify the source file
const file = argv._[0] || argv.f || argv.file || 'TODO.md';

// Use `-r` or `--reporter` to specify the reporter to use
const reporter = argv._[1] || argv.r || argv.reporter || 'console';

const outFile = argv.o || argv.outfile;

if (!file) {
	console.error('Please provide a source file, either as a first argument or with `-f` or `--file`');
}

/**
 * Application.
 */
const violations = check(file);
const output = formatter(violations, reporter);

writeOutput(output);

if (outFile) {
	writeFile(formatter(violations, 'checkstyle'), outFile);
}
