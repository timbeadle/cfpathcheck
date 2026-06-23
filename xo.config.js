export default [
	{
		files: ['**/*.js'],
		rules: {
			'arrow-parens': 0,
			'jsdoc/require-asterisk-prefix': ['error', 'always'],
			'object-curly-spacing': 0,
			'n/prefer-global/process': 0,
			'unicorn/no-computed-property-existence-check': 0,
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/arrow-parens': ['error', 'always'],
		},
	},
];
