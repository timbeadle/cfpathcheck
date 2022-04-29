const { expect } = require('chai');
const { describe, it } = require('mocha');
const cfpathcheck = require('../lib/cfpathcheck');

describe('cfpathcheck', () => {
	describe('check', () => {
		it('is a function', () => {
			expect(cfpathcheck.check).to.be.an.instanceOf(Function);
		});
	});

	describe('checkFile', () => {
		it('is a function', () => {
			expect(cfpathcheck.checkFile).to.be.an.instanceOf(Function);
		});
	});

	describe('comparePrefixArrays', () => {
		it('is a function', () => {
			expect(cfpathcheck.comparePrefixArrays).to.be.an.instanceOf(Function);
		});
	});

	describe('formatter', () => {
		const violations = cfpathcheck.check('./test/test-template.cfm', 'json');

		it('is a function', () => {
			expect(cfpathcheck.formatter).to.be.an.instanceOf(Function);
		});

		it('returns a non-zero length string when using checkstyle', () => {
			expect(cfpathcheck.formatter(violations, 'checkstyle').length).to.be.above(0);
		});

		it('returns an array when not using checkstyle', () => {
			expect(cfpathcheck.formatter(violations, 'plain')).to.be.an.instanceOf(Array);
		});
	});

	describe('getFiles', () => {
		it('is a function', () => {
			expect(cfpathcheck.getFiles).to.be.an.instanceOf(Function);
		});
	});

	describe('readFile', () => {
		it('is a function', () => {
			expect(cfpathcheck.readFile).to.be.an.instanceOf(Function);
		});

		it('can read a file', () => {
			expect(cfpathcheck.readFile('./test/test-template.cfm').length).to.equal(562);
		});
	});

	describe('writeFile', () => {
		it('is a function', () => {
			expect(cfpathcheck.writeFile).to.be.an.instanceOf(Function);
		});
	});

	describe('writeOutput', () => {
		it('is a function', () => {
			expect(cfpathcheck.writeOutput).to.be.an.instanceOf(Function);
		});
	});
});
