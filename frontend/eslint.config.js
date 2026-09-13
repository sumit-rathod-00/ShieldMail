const globals = require('globals');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginReactRefresh = require('eslint-plugin-react-refresh');

module.exports = tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
