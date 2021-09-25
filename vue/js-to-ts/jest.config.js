module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",

  // Override test files matching
  testMatch: ["**/*.spec.(j|t)s"],

  // Add @tests path alias which is test files specific
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },

  globals: {
    "ts-jest": {
      // The preset turns this on, preserve this setting.
      babelConfig: true,
      // Need to use a custom TS config so that JS files importing TS files
      // won't break Jest.
      tsConfig: "<rootDir>/tsconfig.test.json",
    },
  },
};
