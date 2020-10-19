const path = require("path")

module.exports = {
  preset: "jest-playwright-preset",
  reporters: ["@testim/root-cause-jest/lib/reporter/default"],
  testEnvironment: "@testim/root-cause-jest/lib/RootCauseJestEnv",
  testEnvironmentOptions: {
    actualEnvironment: path.resolve("./config/environment.js"),
  },
  testTimeout: 35 * 1000,
}
