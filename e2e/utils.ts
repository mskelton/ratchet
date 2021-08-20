import { Page } from "@playwright/test"
import * as fs from "fs"
import * as os from "os"

export const getValue = (page: Page, editorId: "input" | "output") =>
  page.evaluate((editorId) => {
    const editor = window[editorId] as unknown as { getValue(): string }
    return editor.getValue()
  }, editorId)

/**
 * Read the value of a fixture
 * @param {string} fixture
 */
export const read = (fixture) =>
  fs.readFileSync(`../__testfixtures__/${fixture}.js`, "utf-8").trim()

/** @type {'Meta' | 'Control'} */
export const ctrlKey = os.type() === "Darwin" ? "Meta" : "Control"
