// --- Dependencies: webpack stuff
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// --- Dependencies: Others
const path = require('path');

module.exports = {
  // https://webpack.js.org/configuration/mode/
  mode: 'production',

  // >> https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    lib: path.resolve(__dirname, 'lib.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolvealias
    alias: {
      '@bw': path.resolve(__dirname),
    },
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    extensions: ['.ts', '.js', '.json'],
  },

  module: {
    rules: [
      // https://webpack.js.org/guides/typescript/
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // https://webpack.js.org/loaders/css-loader/
          {
            loader: 'css-loader',
            options: {
              // https://webpack.js.org/loaders/css-loader/#importloaders
              importLoaders: 1,
            },
          },
          // https://webpack.js.org/loaders/postcss-loader/
          {
            loader: 'postcss-loader',
          },
          // https://webpack.js.org/loaders/sass-loader/
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  plugins: [
    /**
     * https://www.npmjs.com/package/clean-webpack-plugin
     */
    new CleanWebpackPlugin(),

    /**
     * Mini CSS extract plugin: to have styling in dedicated files
     * https://webpack.js.org/plugins/mini-css-extract-plugin/
     */
    new MiniCssExtractPlugin({
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#advanced-configuration-example
      filename: '[name].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
};
