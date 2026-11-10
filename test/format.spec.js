import chalk from 'chalk';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { check } from '../lib/cfpathcheck.js';
import { formatMessageText, formatter, writeOutput } from '../lib/format.js';

describe('formatter', () => {
	describe('formatMessageText', () => {
		it('is a function', () => {
			expect(formatMessageText).to.be.an.instanceOf(Function);
		});

		it('formats the line, column and message', () => {
			const message = {
				line: 7,
				column: 3,
				message: 'Template not found',
				severity: 'error',
			};

			expect(formatMessageText(message)).to.equal(chalk.red('L7:3 - Template not found'));
		});

		it('formats warnings', () => {
			const message = {
				line: 4,
				column: 11,
				message: 'Prefix not used',
				severity: 'warning',
			};

			expect(formatMessageText(message)).to.equal(chalk.yellow('L4:11 - Prefix not used'));
		});

		it('does not colour messages with an unknown severity', () => {
			const message = {
				line: 1,
				column: 1,
				message: 'Just a note',
				severity: 'info',
			};

			expect(formatMessageText(message)).to.equal('L1:1 - Just a note');
		});
	});

	describe('formatOutput', () => {
		const violations = check('./fixtures/test-template.cfm');

		it('is a function', () => {
			expect(formatter).to.be.an.instanceOf(Function);
		});

		it('returns a non-zero length string when using checkstyle', () => {
			expect(formatter(violations, 'checkstyle').length).to.be.above(0);
		});

		it('returns checkstyle XML when using checkstyle', () => {
			const output = formatter(violations, 'checkstyle');

			expect(output).to.include('<?xml version="1.0" encoding="utf-8"?>');
			expect(output).to.include('<checkstyle version="4.3">');
			expect(output).to.include('<error ');
		});

		it('returns an array when not using checkstyle', () => {
			expect(formatter(violations, 'plain')).to.be.an.instanceOf(Array);
		});

		it('returns the violations unchanged when not using checkstyle', () => {
			expect(formatter(violations, 'plain')).to.equal(violations);
		});
	});

	describe('writeOutput', () => {
		it('is a function', () => {
			expect(writeOutput).to.be.an.instanceOf(Function);
		});

		it('writes an array of violations to the console', () => {
			const messages = [
				{
					line: 1,
					column: 2,
					message: 'Template not found',
					severity: 'error',
				},
			];
			const calls = [];
			const originalLog = console.log;

			console.log = (...args) => {
				calls.push(args);
			};

			try {
				writeOutput([
					{
						filename: 'test.cfm',
						messages,
					},
				]);
			} finally {
				console.log = originalLog;
			}

			expect(calls).to.have.lengthOf(2);
			expect(calls[0][0]).to.include('test.cfm');
			expect(calls[1][2]).to.equal(formatMessageText(messages[0]));
		});

		it('writes a string to the console', () => {
			const calls = [];
			const originalLog = console.log;

			console.log = (...args) => {
				calls.push(args);
			};

			try {
				writeOutput('formatted output');
			} finally {
				console.log = originalLog;
			}

			expect(calls).to.deep.equal([['formatted output']]);
		});
	});
});
