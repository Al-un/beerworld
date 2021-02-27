const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  // mode defined inline in the package.json scripts

  entry: {
    base: path.resolve(__dirname, "src/index.ts"),
    "my-lib": path.resolve(__dirname, "src/my-lib.ts"),
    "some-box": path.resolve(__dirname, "src/some-box.js"),
    "some-lit-box": path.resolve(__dirname, "src/some-lit-box.js"),
    "some-lit-ts-box": path.resolve(__dirname, "src/some-lit-ts-box.ts"),
  },

  // devtool: "inline-source-map",
  devServer: {
    bonjour: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      chunks: ["base"],
    }),
  ],
};
