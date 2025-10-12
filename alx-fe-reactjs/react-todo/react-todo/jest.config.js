process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

const path = require('path');
const createJestConfig =
  require('react-scripts/scripts/utils/createJestConfig');
const paths = require('react-scripts/config/paths');

const config = createJestConfig(
  (relativePath) =>
    path.resolve(__dirname, 'node_modules/react-scripts', relativePath),
  paths.appPath,
  false
);

module.exports = {
  ...config,
  testEnvironment: 'jsdom',
};
