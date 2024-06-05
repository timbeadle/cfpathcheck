// eslint-disable-next-line import/namespace
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { getFiles, readFile, writeFile } from '../lib/file.js';

describe('file', () => {
	describe('getFiles', () => {
		it('is a function', () => {
			expect(getFiles).to.be.an.instanceOf(Function);
		});

		it('can read files from a directory', () => {
			const actual = getFiles('./fixtures/');
			expect(actual.length).to.equal(2);
		});

		it('can read a single file', () => {
			const actual = getFiles('./fixtures/test-script.cfm');
			expect(actual.length).to.equal(1);
		});
	});

	describe('readFile', () => {
		it('is a function', () => {
			expect(readFile).to.be.an.instanceOf(Function);
		});

		it('can read a file', () => {
			expect(readFile('./fixtures/test-template.cfm').length).to.equal(562);
		});
	});

	describe('writeFile', () => {
		it('is a function', () => {
			expect(writeFile).to.be.an.instanceOf(Function);
		});
	});
});
