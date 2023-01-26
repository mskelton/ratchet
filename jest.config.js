export default {
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "e2e"],
  testRegex: ".*\\.spec.js$",
}
