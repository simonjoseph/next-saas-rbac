/** @type {import("eslint").Linter.Config} */

module.exports = {
  extends: ['@rocketseat/eslint-config/react.js'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/exports': 'error',
  },
}
