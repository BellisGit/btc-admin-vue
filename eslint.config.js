import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,ts,vue}'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		plugins: {
			vue,
			'@typescript-eslint': ts
		},
		rules: {
			...vue.configs['vue3-recommended'].rules,
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'vue/multi-word-component-names': 'off',
			'vue/no-v-html': 'off',
			'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'prefer-const': 'error',
			'no-var': 'error',
			'object-shorthand': 'error',
			'prefer-template': 'error'
		}
	},
	{
		files: ['**/*.vue'],
		rules: {
			'vue/component-definition-name-casing': ['error', 'PascalCase'],
			'vue/component-name-in-template-casing': ['error', 'PascalCase'],
			'vue/custom-event-name-casing': ['error', 'camelCase'],
			'vue/define-macros-order': [
				'error',
				{
					order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots']
				}
			],
			'vue/html-comment-content-spacing': ['error', 'always'],
			'vue/no-unused-refs': 'error',
			'vue/padding-line-between-blocks': ['error', 'always'],
			'vue/prefer-separate-static-class': 'error'
		}
	},
	{
		ignores: [
			'node_modules/',
			'dist/',
			'*.min.js',
			'*.d.ts',
			'coverage/',
			'.nuxt/',
			'.output/',
			'.vscode/',
			'.idea/'
		]
	}
];
