// eslint-disable-next-line import/namespace
import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as core from '../lib/core.js';

describe('core', () => {
	describe('check', () => {
		it('is a function', () => {
			expect(core.check).to.be.an.instanceOf(Function);
		});
	});

	describe('checkFile', () => {
		it('is a function', () => {
			expect(core.checkFile).to.be.an.instanceOf(Function);
		});
	});

	describe('comparePrefixArrays', () => {
		it('is a function', () => {
			expect(core.comparePrefixArrays).to.be.an.instanceOf(Function);
		});
	});
});
