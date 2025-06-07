const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const path = require('path');
const { fileURLToPath } = require('url');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

module.exports = defineConfig([
  {
    ...expoConfig[0],
    settings: {
      'import/resolver': {
        typescript: {
          project: path.resolve(__dirname, 'tsconfig.json'),
        },
      },
    },
  },
  ...expoConfig.slice(1),
  {
    ignores: ['dist/*'],
  },
]);



