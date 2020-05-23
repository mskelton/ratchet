// @ts-check
const fs = require("fs")
const os = require("os")

/**
 * Sleep for an period of time
 * @param {number} seconds
 */
exports.sleep = (seconds) => new Promise((r) => setTimeout(r, seconds * 1000))

/**
 * Get the value of an editor
 * @param {'input' | 'output'} editorId
 */
exports.getValue = (editorId) =>
  page.evaluate((editorId) => window[editorId].getValue(), editorId)

/**
 * Read the value of a fixture
 * @param {string} fixture
 */
exports.read = (fixture) =>
  fs.readFileSync(`../__testfixtures__/${fixture}.js`, "utf-8").trim()

/**
 * Get a data-testid selector
 * @param {string} testId
 */
exports.id = (testId) => `[data-testid="${testId}"]`

/** @type {'Meta' | 'Ctrl'} */
exports.ctrlKey = os.type() === "Darwin" ? "Meta" : "Ctrl"
