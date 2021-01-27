const path = require('path');

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // Add "@" path alias resolution
    // https://github.com/storybookjs/storybook/issues/11989#issuecomment-674098096
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@bw': path.resolve(__dirname, '../'),
      },
    };

    return config;
  },
};
