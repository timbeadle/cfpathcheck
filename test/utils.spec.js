/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const utils = require('../lib/utils');

describe('containsObject', () => {
	it('is a function', () => {
		expect(utils.containsObject).to.be.an.instanceOf(Function);
	});

	it('returns true when object is found in array', () => {
		const needle = {
			foo: 'bar',
			baz: 'quux',
		};

		const haystack = [
			{
				foo: 'bar',
				baz: 'quux',
			}
		];

		expect(utils.containsObject(needle, haystack)).to.be.true;
	});

	it('returns false when object is not found in array', () => {
		const needle = {
			foo: 'bar',
			baz: 'quux',
		};

		const haystack = [
			{
				bar: 'foo',
				quux: 'baz',
			}
		];

		expect(utils.containsObject(needle, haystack)).to.be.false;
	});
});

describe('checkIsXMLFile', () => {
	it('is a function', () => {
		expect(utils.checkIsXMLFile).to.be.an.instanceOf(Function);
	});

	it('returns true when an XML prolog is found', () => {
		const result = utils.checkIsXMLFile('<?xml version="1.0"?>');

		expect(result).to.be.true;
	});

	it('returns true when an XML content-type is found', () => {
		const result = utils.checkIsXMLFile('<foo type="text/xml">');

		expect(result).to.be.true;
	});

	it('returns false when neither an XML prolog nor content-type is found', () => {
		const result = utils.checkIsXMLFile('<issues>');

		expect(result).to.be.false;
	});
});
