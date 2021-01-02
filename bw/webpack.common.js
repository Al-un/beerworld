// --- Dependencies: webpack stuff
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// --- Dependencies: Others
const path = require("path");
const fs = require("fs");
// --- Config
const IS_DEV_MODE = process.env.NODE_ENV !== "production";

// Load all pages in the pages folder (default: pages/). A JavaScript file is
// recognized as a page if a HTML file with the exact same name exists
//
// Sub-folders are not supported
const loadPages = (pagesFolder = "pages") => {
  const pageCandidates = {};

  // Load all files in the pages folder and check if there is a HTML and JS
  const files = fs.readdirSync(path.join(__dirname, pagesFolder));
  files.forEach((f) => {
    const fileCheck = f.match(/^(.*)\.(html|js)$/i);

    // If the file is a valid file, save filename with "html" or "js" key
    if (fileCheck) {
      pageCandidates[fileCheck[1]] = {
        ...pageCandidates[fileCheck[1]],
        [fileCheck[2]]: true,
      };
    }
  });

  const entries = {};
  let htmlPages = [];

  Object.keys(pageCandidates).forEach((pageName) => {
    // Page is valid only if both HTML and JS are present
    if (pageCandidates[pageName].html && pageCandidates[pageName].js) {
      // Add JS entry
      entries[pageName] = path.resolve(
        __dirname,
        pagesFolder,
        `${pageName}.js`
      );

      // Add HTML entry
      htmlPages = [
        ...htmlPages,
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, pagesFolder, `${pageName}.html`),
          filename: `${pageName}.html`,
          hash: false,
          chunks: [pageName],
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
