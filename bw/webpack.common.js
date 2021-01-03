// --- Dependencies: webpack stuff
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// --- Dependencies: Others
const path = require("path");
const fs = require("fs");
// --- Config
const FOLDER_PAGES = "pages";
const FOLDER_TEMPLATES = "templates";
const IS_DEV_MODE = process.env.NODE_ENV !== "production";

// Load all pages in the pages folder (default: pages/). A JavaScript file is
// recognized as a page if a HTML file with the exact same name exists
//
// Sub-folders are not supported
const loadPages = (pagesFolder = FOLDER_PAGES) => {
  let entries = {};
  let htmlPages = [];

  // Load all files in the pages folder and check if there is a HTML and JS
  const files = fs.readdirSync(path.join(__dirname, pagesFolder));
  files.forEach((f) => {
    const fileCheck = f.match(/^(.*)\.js$/i);

    if (fileCheck) {
      // Remove the .js extension
      const pageName = fileCheck[1];

      // Add JS entry
      entries = {
        ...entries,
        [pageName]: path.resolve(__dirname, pagesFolder, `${pageName}.js`),
      };

      // Add HTML entry
      htmlPages = [
        ...htmlPages,
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, FOLDER_TEMPLATES, `app.html`),
          filename: `${pageName}.html`,
          hash: false,
          chunks: [pageName],
          // https://veerasundar.com/blog/2019/01/how-to-inject-environment-values-in-javascript-app-with-webpack/
          bwEnv: {
            apiBaseUrl: process.env.API_BASE_URL,
          },
        }),
      ];
    }
  });

  return { entries, htmlPages };
};
const pages = loadPages();

module.exports = {
  // https://webpack.js.org/configuration/mode/
  mode: IS_DEV_MODE ? "development" : "production",

  // >> https://webpack.js.org/configuration/entry-context/#entry
  // >> Simple rule: one entry point per HTML page. SPA: one entry point, MPA: multiple entry points.
  entry: pages.entries,

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // https://webpack.js.org/plugins/mini-css-extract-plugin/#common-use-case
          IS_DEV_MODE
            ? // https://webpack.js.org/loaders/style-loader/
              "style-loader"
            : // https://webpack.js.org/plugins/mini-css-extract-plugin/#loader-options
              {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: "dist/styles" },
              },
          // https://webpack.js.org/loaders/css-loader/
          "css-loader",
          // https://webpack.js.org/loaders/sass-loader/
          "sass-loader",
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
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
      filename: IS_DEV_MODE ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: IS_DEV_MODE ? "[id].css" : "[id].[contenthash].css",
    }),

    /**
     * HTML Webpack plugin:
     * https://webpack.js.org/plugins/html-webpack-plugin/
     */
    ...pages.htmlPages,
  ],
};
