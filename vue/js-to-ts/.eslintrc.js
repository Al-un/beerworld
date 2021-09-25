module.exports = {
  root: true,
  env: {
    node: true,
  },

  // ----------
  // Uncomment the TypeScript specific presets to enable TypeScript linting
  // rules. Do not rearrange presets order as order matters. The plugins list
  // is copied from a Vue 2 project freshly generated with @vue/cli
  //
  // If TypeScript presets are used, reducing @typescript-eslint/ban-ts-comment
  // down to "warn" instead of "error" might be required as typing the whole
  // project cannot be done quickly.
  // ----------
  extends: [
    // Available linting presets, from loosest to strictest:
    //
    // plugin:vue/base
    // plugin:vue/vue3-essential
    // plugin:vue/vue3-strongly-recommended
    // plugin:vue/vue3-recommended
    // plugin:vue/essential
    // plugin:vue/strongly-recommended
    // plugin:vue/recommended
    //
    // From: https://eslint.vuejs.org/rules/
    "plugin:vue/recommended",
    "eslint:recommended",
    // '@vue/typescript/recommended', // --> see TS override below
    "@vue/prettier",
    // '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // v-html is currently being used so limit it to warning only
    // https://eslint.vuejs.org/rules/no-v-html.html
    "vue/no-v-html": "warn",
    // To enforce consistency between component name and file name
    // https://eslint.vuejs.org/rules/match-component-file-name.html
    "vue/match-component-file-name": ["warn", { extensions: ["vue"] }],
  },
  overrides: [
    // TypeScript files. As the project is currently hybrid using both JavaScript
    // and TypeScript components, linting rules must be adapted for each component
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint",
      ],
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
      },
    },
    // Jest / Testing files
    {
      files: ["**/*.spec.{j,t}s?(x)", "jest.setup.js", "tests/**.*{j,t}s"],
      env: {
        jest: true,
      },
    },
  ],
};
