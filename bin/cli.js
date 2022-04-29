#!/usr/bin/env node

'use strict';

const argv = require('minimist')(process.argv.slice(2));
const cfpathcheck = require('../lib/cfpathcheck');

/**
 * Everything in the file should be customized.
 */

// Use `-f` or `--file` to specify the source file
const file = argv._[0] || argv.f || argv.file || 'TODO.md';

// Use `-r` or `--reporter` to specify the reporter to use
const reporter = argv._[1] || argv.r || argv.reporter || 'console';

const outFile = argv.o || argv.outfile;

if (!file) {
	console.error(
		'Please provide a source file, either as a first argument or with `-f` or `--file`',
	);
}

/**
 * Application.
 */
const violations = cfpathcheck.check(file, 'json');
const output = cfpathcheck.formatter(violations, reporter);

cfpathcheck.writeOutput(output);

if (outFile) {
	cfpathcheck.writeFile(
		cfpathcheck.formatter(violations, 'checkstyle'),
		outFile,
	);
}
