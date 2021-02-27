import {
  configure,
  addParameters,
  setCustomElements,
} from "@storybook/web-components";

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
// };


// ---- copied from https://github.com/storybookjs/storybook/tree/next/examples/web-components-kitchen-sink

// configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);

// force full reload to not re-register web components
const req = require.context("../src", true, /\.stories\.(ts|js|mdx)$/);

configure(req, module);

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}
