// --- Dependencies: webpack stuff
const HtmlWebpackPlugin = require("html-webpack-plugin");
// --- Dependencies: Others
const path = require("path");
const fs = require("fs");

// Load all pages in the pages folder (default: pages/).  Sub-folders are not supported
const pages = ((pagesFolder = "pages") => {
  // _common.js is shared by all pages
  let entries = {
    common: path.resolve(__dirname, `${pagesFolder}/_common.js`),
  };
  let htmlPages = [];

  // Load all files in the pages folder
  const files = fs.readdirSync(path.join(__dirname, pagesFolder));
  files.forEach((file) => {
    const fileCheck = file.match(/^(?!_)(.*)\.js$/i);

    if (fileCheck) {
      // Remove the .js extension
      const pageName = fileCheck[1];
      const outputName = pageName === "home" ? "index" : pageName;

      // Add JS entry
      entries = {
        ...entries,
        [outputName]: path.resolve(__dirname, pagesFolder, `${pageName}.js`),
      };

      // Add HTML entry
      const template = path.resolve(__dirname, pagesFolder, `${pageName}.html`);

      htmlPages = [
        ...htmlPages,
        new HtmlWebpackPlugin({
          template,
          chunks: ["common", outputName],
          filename: `${outputName}.html`,
        }),
      ];
    }
  });

  return { entries, htmlPages };
})();

module.exports = {
  mode: "development",

  devtool: "inline-source-map",
  devServer: {
    bonjour: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },

  entry: pages.entries,

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [...pages.htmlPages],
};
