// eslint-disable-next-line import/namespace
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { check } from '../lib/cfpathcheck.js';
import { formatter, writeOutput } from '../lib/format.js';

describe('formatter', () => {
	describe('formatOutput', () => {
		const violations = check('./fixtures/test-template.cfm');

		it('is a function', () => {
			expect(formatter).to.be.an.instanceOf(Function);
		});

		it('returns a non-zero length string when using checkstyle', () => {
			expect(formatter(violations, 'checkstyle').length).to.be.above(0);
		});

		it('returns an array when not using checkstyle', () => {
			expect(formatter(violations, 'plain')).to.be.an.instanceOf(Array);
		});
	});

	describe('writeOutput', () => {
		it('is a function', () => {
			expect(writeOutput).to.be.an.instanceOf(Function);
		});
	});
});
