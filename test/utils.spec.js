/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { describe, it } = require('mocha');
const utils = require('../lib/utils');

describe('utils', () => {

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

	describe('matchAll', () => {
		it('is a function', () => {
			expect(utils.matchAll).to.be.an.instanceOf(Function);
		});

		it('returns an array', () => {
			const line = '\t\t\t<foo:bar x="y" />';
			const result = utils.matchAll(line, /<([A-Za-z0-9]+):/g);

			expect(result).to.be.an.instanceOf(Array);
		});

		it('finds matches when regex is global', () => {
			const line = '\t\t\t<foo:bar x="y" /><biz:bosh />';
			const result = utils.matchAll(line, /<([A-Za-z0-9]+):/g);

			expect(result.length).to.equal(2);
		});

		it('finds one match when regex is not global', () => {
			const line = '\t\t\t<foo:bar x="y" />';
			const result = utils.matchAll(line, /<([A-Za-z0-9]+):/);

			expect(result.length).to.equal(1);
		});
	});

});
