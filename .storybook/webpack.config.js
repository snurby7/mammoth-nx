'use strict';

const webpackCommonConfig = require('../webpack-common.config');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Add support for Tailwind
  config.module.rules.push(webpackCommonConfig.tailwindWebpackRule);

  // Return the altered config
  return config;
};
