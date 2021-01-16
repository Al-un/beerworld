## Dependencies

| Package                            | Link                                                         | Purpose                                  |
| ---------------------------------- | ------------------------------------------------------------ | ---------------------------------------- |
| `@babel/core`                      | https://babeljs.io/docs/en/babel-core                        |                                          |
| `@babel/preset-env`                | https://babeljs.io/docs/en/babel-preset-env                  |                                          |
| `@babel/plugin-transform-runtime`  | https://babeljs.io/docs/en/babel-plugin-transform-runtime    |                                          |
| `babel-loader`                     | https://webpack.js.org/loaders/babel-loader/                 |                                          |
| `clean-webpack-plugin`             | https://www.npmjs.com/package/clean-webpack-plugin           | To clean the _dist/_ folder              |
| `css-loader`                       | https://webpack.js.org/loaders/css-loader/                   |                                          |
| `html-loader`                      | https://webpack.js.org/loaders/html-loader/                  |                                          |
| `html-webpack-plugin`              | https://webpack.js.org/plugins/html-webpack-plugin/          | To load HTML files templates             |
| `mini-css-extract-plugin`          | https://webpack.js.org/plugins/mini-css-extract-plugin/      | To have styles in dedicated CSS files    |
| `prettier`                         | https://prettier.io/                                         | Code formatter                           |
| `sass`                             | https://www.npmjs.com/package/sass                           | SASS JavaScript implementation           |
| `sass-loader`                      | https://webpack.js.org/loaders/sass-loader/                  |                                          |
| `style-loader`                     | https://webpack.js.org/loaders/style-loader/                 |                                          |
| `stylelint`                        | https://stylelint.io/user-guide/get-started                  | Style linting                            |
| `stylelint-config-sass-guidelines` | https://github.com/bjankord/stylelint-config-sass-guidelines | Linting rules for SASS                   |
| `stylelint-order`                  | https://github.com/hudochenkov/stylelint-order               | Linting rules regarding properties order |
| `webpack`                          | https://webpack.js.org/                                      |                                          |
| `webpack-cli`                      | https://webpack.js.org/api/cli/                              |                                          |
| `webpack-dev-server`               | https://webpack.js.org/configuration/dev-server/             |                                          |

## References

- webpack
  - https://www.valentinog.com/blog/webpack/
  - https://codingcompiler.com/webpack-tutorial/
  - html-plugin and html webpack plugin conflict:
    - https://stackoverflow.com/questions/54488237/html-loader-overwrite-htmlwebpackplugin-expression
- babel plugin transform runtime: https://stackoverflow.com/a/64083314/4906586
- custom elements
  - https://developers.google.com/web/fundamentals/web-components/customelements
  - https://css-tricks.com/an-introduction-to-web-components/
  - slots
    - https://javascript.info/slots-composition
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Slot
    - https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
    - https://www.digitalocean.com/community/tutorials/web-components-composing-slots-named-slots
  - shadow dom + sass: https://medium.com/swlh/web-components-with-shadow-dom-and-sass-f780ad23dd90
  - render() in connectedCallback: https://stackoverflow.com/a/61039281/4906586
  - https://alligator.io/web-components/attributes-properties/
  - https://robdodson.me/interoperable-custom-elements/
  - https://developers.google.com/web/fundamentals/web-components/best-practices
  - styling shared stylesheet: https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/
- css: alternative to reset https://github.com/necolas/normalize.css/
