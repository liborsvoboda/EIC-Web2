/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */

// eslint-disable-next-line strict
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'header',
		'mocha',
		'eslint-plugin-tsdoc',
		'simple-import-sort',
		'import'
	],
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	env: {
		browser: true,
		node: true
	},
	rules: {
		'no-octal-escape': 0,
		'@typescript-eslint/no-unsafe-declaration-merging': 'off',
		'mocha/no-skipped-tests': 'error',
		'mocha/no-exclusive-tests': 'error',
		'tsdoc/syntax': 'warn',
		strict: ['error', 'never'],
		'import/no-cycle': ['error', { maxDepth: 3 }],
		'no-with': 'error',
		'no-caller': 'error',
		'no-delete-var': 'error',
		'no-proto': 'off',
		'valid-typeof': 'error',
		'no-undef': 'off',
		eqeqeq: ['error', 'always', { null: 'never' }],

		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-symbol': 'error',
		'no-new-wrappers': 'error',
		'no-array-constructor': 'error',
		'new-parens': 'error',
		'max-classes-per-file': ['error', 1],
		'no-extend-native': 'off',
		'no-global-assign': 'error',
		'no-implicit-globals': 'error',
		'no-implicit-coercion': 'error',
		camelcase: 'off',
		quotes: ['error', 'single', { avoidEscape: true }],
		'quote-props': [
			'error',
			'as-needed',
			{ keywords: false, numbers: false }
		],
		'jsx-quotes': 'error',

		'header/header': [2, 'src/header.js'],
		'no-mixed-spaces-and-tabs': 'off',
		'no-empty': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'no-fallthrough': 'off',
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					[
						'jodit/types.*\\u0000$',
						'jodit/types',
						'jodit/.*\\u0000$',
						'jodit/core',
						'jodit/modules'
					],

					// Side effect imports.
					['^\\u0000'],

					// Parent imports. Put `..` last.
					[
						'^\\.\\.(?!/?$)\u0000',
						'^\\.\\./?.*\\u0000$',
						'^\\.\\.(?!/?$)',
						'^\\.\\./?$'
					],

					// Other relative imports. Put same-folder imports and `.` last.
					[
						'^\\./?.*\\u0000$',
						'^\\./(?=.*/)(?!/?$)',
						'^\\.(?!/?$)',
						'^\\./?$'
					],

					// Style imports.
					['^.+\\.s?(css|less)$']
				]
			}
		]
	},
	overrides: [
		{
			// enable the rule specifically for TypeScript files
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/explicit-function-return-type': ['error']
			}
		}
	],
	globals: {
		Set: true,
		setCursorToChar: true,
		createPoint: true,
		afterEach: true,
		SynchronousPromise: true,
		mocha: true,
		chai: true,
		Promise: true,
		defaultPermissions: true,
		getOpenedPopup: true,
		getOpenedDialog: true,
		getBox: true,
		offset: true,
		i18nkeys: true,
		appendTestDiv: true,
		getButton: true,
		clickTrigger: true,
		clickButton: true,
		sortAttributes: true,
		onLoadImage: true,
		sortStyles: true,
		simulateEvent: true,
		simulatePaste: true,
		beforeEach: true,
		describe: true,
		it: true,
		getJodit: true,
		Jodit: true,
		expect: true,
		unmockPromise: true,
		appendTestArea: true,
		mockPromise: true,
		fillBoxBr: true,
		selectCells: true,
		before: true,
		after: true,
		FileImage: true,
		FileXLS: true
	}
};
