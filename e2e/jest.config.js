module.exports = {
  preset: "jest-playwright-preset",
  setupFilesAfterEnv: ["expect-playwright"],
  testRunner: "jest-circus/runner",
  testEnvironment: "./config/environment.js",
  testTimeout: 35 * 1000,
}
