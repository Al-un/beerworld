module.exports = {
  logLevel: "debug",
  // stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/i,
      use: [
        { loader: "css-loader", options: { importLoaders: 1 } },
        { loader: "postcss-loader" },
        { loader: "sass-loader" },
      ],
    });

    return config;
  },
};
