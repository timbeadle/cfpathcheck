import { expect } from 'chai';
import { describe, it } from 'mocha';
import { check, checkFile, comparePrefixArrays, formatter, getFiles, readFile, writeFile, writeOutput } from '../lib/cfpathcheck.js';

describe('cfpathcheck', () => {

	describe('check', () => {
		it('is a function', () => {
			expect(check).to.be.an.instanceOf(Function);
		});
	});

	describe('checkFile', () => {
		it('is a function', () => {
			expect(checkFile).to.be.an.instanceOf(Function);
		});
	});

	describe('comparePrefixArrays', () => {
		it('is a function', () => {
			expect(comparePrefixArrays).to.be.an.instanceOf(Function);
		});
	});

	describe('formatter', () => {
		const violations = check('./test/test-template.cfm', 'json');

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

	describe('getFiles', () => {
		it('is a function', () => {
			expect(getFiles).to.be.an.instanceOf(Function);
		});
	});

	describe('readFile', () => {
		it('is a function', () => {
			expect(readFile).to.be.an.instanceOf(Function);
		});

		it('can read a file', () => {
			expect(readFile('./test/test-template.cfm').length).to.equal(562);
		});
	});

	describe('writeFile', () => {
		it('is a function', () => {
			expect(writeFile).to.be.an.instanceOf(Function);
		});
	});

	describe('writeOutput', () => {
		it('is a function', () => {
			expect(writeOutput).to.be.an.instanceOf(Function);
		});
	});

});
