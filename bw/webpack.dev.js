const commonConfig = require("./webpack.common");

const path = require("path");

module.exports = {
  ...commonConfig,

  // https://webpack.js.org/guides/development/#using-source-maps
  devtool: "inline-source-map",

  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devserverbonjour
    bonjour: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
};
