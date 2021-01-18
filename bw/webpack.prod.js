const commonConfig = require('./webpack.common');

const path = require('path');

module.exports = {
  ...commonConfig,

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
