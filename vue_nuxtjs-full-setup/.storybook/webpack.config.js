/**
 * Black magic webpack incantations taken from:
 * https://github.com/storybookjs/storybook/issues/2792
 */

// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const path = require('path')

module.exports = ({ config }) => {
  config.resolve.extensions.push(
    '.ts',
    '.vue',
    '.css',
    '.scss',
    '.html'
  )

  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../'),
    '~': path.resolve(__dirname, '../'),
  }

//   // https://stackoverflow.com/a/56250942/4906586
//   config.module.rules.push({
//     test: /\.stories\.ts?$/,
//     exclude: /node_modules/,
//     use: [
//       { loader: require.resolve('babel-loader') },
//       // https://github.com/storybookjs/storybook/blob/master/MIGRATION.md#from-version-51x-to-52x
//       { loader: require.resolve('@storybook/source-loader') },
//     ],
//   })

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.scss$/,
    // Global SCSS: https://github.com/storybookjs/storybook/issues/6743#issuecomment-490822920
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          prependData: `@use "~/styles/_includes.scss" as *;`,
        },
      },
    ],
  })

  // config.plugins.push(new ForkTsCheckerWebpackPlugin());

  return config
}
