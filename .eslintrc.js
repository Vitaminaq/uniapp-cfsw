module.exports = {
	extends: [
		'plugin:vue/essential',
		'plugin:prettier/recommended'
	],
	plugins: ['prettier', 'typescript'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	},
	parserOptions: {
		parser: '@typescript-eslint/parser'
	}
};