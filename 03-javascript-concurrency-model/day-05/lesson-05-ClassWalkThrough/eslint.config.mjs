import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  stylistic.configs.recommended,
  { languageOptions: { globals: globals.browser },
    ignores: ['test/**/*.js', 'test/**/*.mjs'],
    rules: {
      'camelcase': 'error',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
    } },
];
