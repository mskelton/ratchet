module.exports = {
  preset: "jest-playwright-preset",
  setupFilesAfterEnv: ["expect-playwright"],
  testEnvironment: "./config/environment.js",
  testRunner: "jest-circus/runner",
  testTimeout: 35 * 1000,
}
