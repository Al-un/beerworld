module.exports = async () => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
    rootDir: "./",
  };
};
