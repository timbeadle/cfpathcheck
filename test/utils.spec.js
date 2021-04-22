import { expect } from 'chai';
import { describe, it } from 'mocha';
import { checkIsXMLFile, containsObject, matchAll } from '../lib/utils.js';

describe('utils', () => {

	describe('containsObject', () => {
		it('is a function', () => {
			expect(containsObject).to.be.an.instanceOf(Function);
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

			expect(containsObject(needle, haystack)).to.be.true; // eslint-disable-line no-unused-expressions
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

			expect(containsObject(needle, haystack)).to.be.false; // eslint-disable-line no-unused-expressions
		});
	});

	describe('checkIsXMLFile', () => {
		it('is a function', () => {
			expect(checkIsXMLFile).to.be.an.instanceOf(Function);
		});

		it('returns true when an XML prolog is found', () => {
			const result = checkIsXMLFile('<?xml version="1.0"?>');

			expect(result).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('returns true when an XML content-type is found', () => {
			const result = checkIsXMLFile('<foo type="text/xml">');

			expect(result).to.be.true; // eslint-disable-line no-unused-expressions
		});

		it('returns false when neither an XML prolog nor content-type is found', () => {
			const result = checkIsXMLFile('<issues>');

			expect(result).to.be.false; // eslint-disable-line no-unused-expressions
		});
	});

	describe('matchAll', () => {
		it('is a function', () => {
			expect(matchAll).to.be.an.instanceOf(Function);
		});

		it('returns an array', () => {
			const line = '\t\t\t<foo:bar x="y" />';
			const result = matchAll(line, /<([A-Za-z\d]+):/g);

			expect(result).to.be.an.instanceOf(Array);
		});

		it('finds matches when regex is global', () => {
			const line = '\t\t\t<foo:bar x="y" /><biz:bosh />';
			const result = matchAll(line, /<([A-Za-z\d]+):/g);

			expect(result.length).to.equal(2);
		});

		it('finds one match when regex is not global', () => {
			const line = '\t\t\t<foo:bar x="y" />';
			const result = matchAll(line, /<([A-Za-z\d]+):/);

			expect(result.length).to.equal(1);
		});
	});

});
