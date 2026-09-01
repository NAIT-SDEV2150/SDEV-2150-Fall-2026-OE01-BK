import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress/flat';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginCypress.configs.globals,
  pluginCypress.configs.recommended,
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
