const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
  ...expoConfig,
  {
    ignores: ['android/**', 'ios/**', 'dist/**', '.expo/**', 'node_modules/**', 'modules/**/build/**'],
  },
  {
    files: ['babel.config.js', 'eslint.config.js', 'plugins/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  prettierConfig,
];
