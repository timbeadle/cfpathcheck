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
