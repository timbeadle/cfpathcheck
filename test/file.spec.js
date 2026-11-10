import { existsSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
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

			expect(actual.length).to.equal(3);
		});

		it('can read files from a directory without a trailing slash', () => {
			const actual = getFiles('./fixtures');

			expect(actual.length).to.equal(3);
		});

		it('does not read files from WEB-INF directories', () => {
			const actual = getFiles('./fixtures/');

			expect(actual.some((fileName) => fileName.includes('WEB-INF'))).to.be.false; // eslint-disable-line no-unused-expressions
		});

		it('can read a single file', () => {
			const actual = getFiles('./fixtures/test-script.cfm');

			expect(actual.length).to.equal(1);
			expect(actual[0]).to.equal(path.resolve('./fixtures/test-script.cfm'));
		});

		it('returns an empty array when the path does not exist', () => {
			expect(getFiles('./fixtures/does-not-exist.cfm')).to.deep.equal([]);
		});
	});

	describe('readFile', () => {
		it('is a function', () => {
			expect(readFile).to.be.an.instanceOf(Function);
		});

		it('can read a file', () => {
			expect(readFile('./fixtures/test-template.cfm').length).to.equal(562);
		});

		it('normalises CRLF line endings', () => {
			const filePath = './fixtures/crlf-test.tmp';

			writeFileSync(filePath, 'first\r\nsecond', 'utf8');

			try {
				expect(readFile(filePath)).to.equal('first\nsecond');
			} finally {
				unlinkSync(filePath);
			}
		});
	});

	describe('writeFile', () => {
		it('is a function', () => {
			expect(writeFile).to.be.an.instanceOf(Function);
		});

		it('writes to a relative path', () => {
			const filePath = './fixtures/write-relative.tmp';

			try {
				writeFile('hello', filePath);

				expect(readFile(filePath)).to.equal('hello');
			} finally {
				if (existsSync(filePath)) {
					unlinkSync(filePath);
				}
			}
		});

		it('writes to an absolute path', () => {
			const filePath = path.resolve('./fixtures/write-absolute.tmp');

			try {
				writeFile('hello', filePath);

				expect(readFile(filePath)).to.equal('hello');
			} finally {
				if (existsSync(filePath)) {
					unlinkSync(filePath);
				}
			}
		});

		it('warns when the destination directory does not exist', () => {
			const filePath = './fixtures/does-not-exist/write.tmp';
			const warnings = [];
			const originalWarn = console.warn;

			console.warn = (message) => {
				warnings.push(message);
			};

			try {
				writeFile('hello', filePath);
			} finally {
				console.warn = originalWarn;
			}

			expect(warnings).to.deep.equal([
				`Cannot write ${path.resolve(filePath)}. Destination directory doesn't exist`,
			]);
		});
	});
});
