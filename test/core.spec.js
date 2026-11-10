import path from 'node:path';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as core from '../lib/core.js';

const missingTemplatePath = path.resolve('./fixtures/missing.cfm');

describe('core', () => {
	describe('check', () => {
		it('is a function', () => {
			expect(core.check).to.be.an.instanceOf(Function);
		});

		it('returns a single group when checking a file with violations', () => {
			const actual = core.check('./fixtures/test-template.cfm');

			expect(actual).to.have.lengthOf(1);
			expect(actual[0].filename).to.equal(path.resolve('./fixtures/test-template.cfm'));
			expect(actual[0].messages.length).to.be.above(0);
		});

		it('checks every .cfm file in a directory', () => {
			const actual = core.check('./fixtures/');
			const filenames = actual.map((violation) => path.basename(violation.filename)).toSorted((a, b) => a.localeCompare(b));

			expect(filenames).to.deep.equal(['test-script.cfm', 'test-template.cfm']);
		});

		it('returns no groups when a file has no violations', () => {
			expect(core.check('./fixtures/valid.cfm')).to.deep.equal([]);
		});

		it('returns no violations for a path that does not exist', () => {
			expect(core.check('./fixtures/does-not-exist.cfm')).to.deep.equal([]);
		});
	});

	describe('checkFile', () => {
		it('is a function', () => {
			expect(core.checkFile).to.be.an.instanceOf(Function);
		});

		it('returns no violations for a valid file', () => {
			expect(core.checkFile('./fixtures/valid.cfm')).to.deep.equal([]);
		});

		it('reports used namespace prefixes that are not imported', () => {
			const actual = core.checkFile('./fixtures/test-template.cfm');

			expect(actual).to.deep.include({
				line: 9,
				column: 4,
				message: 'used namespace prefix "mpx" not cfimported',
				severity: 'error',
			});
		});

		it('reports imported namespace prefixes that are not used', () => {
			const actual = core.checkFile('./fixtures/test-template.cfm');

			expect(actual).to.deep.include({
				line: 2,
				column: 11,
				message: 'cfimported namespace prefix "common" not used',
				severity: 'warning',
			});
		});

		it('reports missing cfinclude template paths', () => {
			const actual = core.checkFile('./fixtures/test-template.cfm');

			expect(actual).to.deep.include({
				line: 12,
				column: 14,
				message: `cfinclude/include template path ${missingTemplatePath} not found`,
				severity: 'error',
			});
		});

		it('reports missing cfimport taglib paths', () => {
			const actual = core.checkFile('./fixtures/test-template.cfm');
			const taglibPath = path.resolve('./fixtures/../extensions/customtags/');

			expect(actual).to.deep.include({
				line: 1,
				column: 23,
				message: `cfimport taglib path ${taglibPath} not found`,
				severity: 'error',
			});
		});

		it('reports missing include paths in script syntax', () => {
			expect(core.checkFile('./fixtures/test-script.cfm')).to.deep.equal([
				{
					line: 2,
					column: 1,
					message: `cfinclude/include template path ${missingTemplatePath} not found`,
					severity: 'error',
				},
			]);
		});
	});

	describe('comparePrefixArrays', () => {
		const message = 'cfimported namespace prefix "{2}" not used';

		it('is a function', () => {
			expect(core.comparePrefixArrays).to.be.an.instanceOf(Function);
		});

		it('returns no violations when all prefixes match', () => {
			const actual = core.comparePrefixArrays(
				[
					{
						prefix: 'mp',
						line: 1,
						column: 1,
					},
				],
				[
					{
						prefix: 'mp',
						line: 2,
						column: 1,
					},
				],
				message,
				'warning',
			);

			expect(actual).to.deep.equal([]);
		});

		it('reports a prefix that is not found in the second array', () => {
			const actual = core.comparePrefixArrays(
				[
					{
						prefix: 'mp',
						line: 2,
						column: 11,
					},
				],
				[],
				message,
				'warning',
			);

			expect(actual).to.deep.equal([
				{
					line: 2,
					column: 11,
					message: 'cfimported namespace prefix "mp" not used',
					severity: 'warning',
				},
			]);
		});

		it('reports only the prefixes that do not match', () => {
			const actual = core.comparePrefixArrays(
				[
					{
						prefix: 'mp',
						line: 1,
						column: 1,
					},
					{
						prefix: 'common',
						line: 2,
						column: 1,
					},
				],
				[
					{
						prefix: 'mp',
						line: 3,
						column: 1,
					},
				],
				message,
				'warning',
			);

			expect(actual).to.deep.equal([
				{
					line: 2,
					column: 1,
					message: 'cfimported namespace prefix "common" not used',
					severity: 'warning',
				},
			]);
		});

		it('defaults the column to 1 when it is not provided', () => {
			const actual = core.comparePrefixArrays(
				[
					{
						prefix: 'mp',
						line: 2,
					},
				],
				[],
				message,
				'warning',
			);

			expect(actual).to.deep.equal([
				{
					line: 2,
					column: 1,
					message: 'cfimported namespace prefix "mp" not used',
					severity: 'warning',
				},
			]);
		});

		it('does not report the same prefix twice at the same position', () => {
			const prefix = {
				prefix: 'mp',
				line: 2,
				column: 11,
			};

			const actual = core.comparePrefixArrays([prefix, prefix], [], message, 'warning');

			expect(actual).to.have.lengthOf(1);
		});
	});
});
