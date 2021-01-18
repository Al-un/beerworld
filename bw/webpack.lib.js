// --- Dependencies: webpack stuff
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// --- Dependencies: Others
const path = require('path');

module.exports = {
  // https://webpack.js.org/configuration/mode/
  mode: 'production',

  // >> https://webpack.js.org/configuration/entry-context/#entry
  // >> Simple rule: one entry point per HTML page. SPA: one entry point, MPA: multiple entry points.
  entry: {
    lib: path.resolve(__dirname, 'index.ts'),
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
            options: { publicPath: 'dist/styles' },
          },
          // https://webpack.js.org/loaders/css-loader/
          'css-loader',
          // https://webpack.js.org/loaders/sass-loader/
          'sass-loader',
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
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
};
