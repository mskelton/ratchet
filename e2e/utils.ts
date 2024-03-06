import { Page } from "@playwright/test"
import fs from "node:fs"
import os from "node:os"

export const getValue = (page: Page, editorId: "input" | "output") =>
  page.evaluate((editorId) => {
    const editor = window[editorId] as unknown as { getValue: () => string }
    return editor.getValue()
  }, editorId)

/**
 * Read the value of a fixture
 */
export const read = (fixture: string) =>
  fs.readFileSync(`../__testfixtures__/${fixture}.js`, "utf-8").trim()

const ctrlKey = os.type() === "Darwin" ? "Meta" : "Control"

export async function clearInput(page: Page) {
  await page.click("data-testid=input")
  await page.keyboard.down(ctrlKey)
  await page.keyboard.press("a")
  await page.keyboard.up(ctrlKey)
  await page.keyboard.press("Backspace")
}
