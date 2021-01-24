// --- Dependencies: webpack stuff
const HtmlWebpackPlugin = require("html-webpack-plugin");
// --- Dependencies: Others
const path = require("path");
const fs = require("fs");

// Load all pages in the pages folder (default: pages/).  Sub-folders are not supported
const pages = ((pagesFolder = "pages") => {
  // _common.js is shared by all pages
  let entries = {
    common: path.resolve(__dirname, pagesFolder, "_common.js"),
  };
  let htmlPages = [];

  // Load all files in the pages folder
  const loadPages = (subfolder = "") => {
    const currentFolder = path.join(__dirname, pagesFolder, subfolder);
    const files = fs.readdirSync(currentFolder);

    files.forEach((file) => {
      // Get inside sub-folders
      if (fs.statSync(path.join(currentFolder, file)).isDirectory()) {
        loadPages(`${subfolder ? subfolder + "/" : ""}${file}`);
      }

      // Check JavaScript files only which are not starting with an underscoreF
      const fileCheck = file.match(/^(?!_)(.*)\.js$/i);

      if (fileCheck) {
        // Remove the .js extension
        const pageName = fileCheck[1];
        // Switch home pages to index pages
        const outputName = pageName === "home" ? "index" : pageName;
        // Keep sub-folder structure
        const outputFolder = subfolder ? `${subfolder}/` : "";
        // Prefix chunk name with subfolder to avoid conflicts
        const chunkName = subfolder ? `${subfolder}-${outputName}` : outputName;

        // Add JS entry
        entries = {
          ...entries,
          [chunkName]: {
            import: path.resolve(currentFolder, `${pageName}.js`),
            filename: `${outputFolder}${pageName}.js`,
          },
        };

        // Add HTML entry
        htmlPages = [
          ...htmlPages,
          new HtmlWebpackPlugin({
            template: path.resolve(currentFolder, `${pageName}.html`),
            chunks: ["common", chunkName],
            filename: `${outputFolder}${outputName}.html`,
          }),
        ];
      }
    });
  };
  loadPages();

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
