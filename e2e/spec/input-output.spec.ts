import { expect, test } from "../fixtures/base.js"
import { clearInput, getValue, read } from "../utils.js"

const outputFixture = read("class-component.output")

test.describe("Input/Output", () => {
  test("should have default content", async ({ page }) => {
    expect(await getValue(page, "input")).toBe(read("function-component.input"))
    expect(await getValue(page, "output")).toBe(
      read("function-component.output")
    )
  })

  test("should clear the output when clearing the input", async ({ page }) => {
    await clearInput(page)
    await page.waitForFunction(
      (editorId) => window[editorId].getValue() === "",
      "output"
    )
  })

  test("should update the output when changing the input", async ({ page }) => {
    await clearInput(page)
    const trimmedInput = read("class-component.input")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")

    await page.type("data-testid=input", trimmedInput)
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )
  })

  test("should not allow editing the output", async ({ page }) => {
    await page.click("data-testid=output")
    await page.keyboard.press("Backspace")
    expect(await getValue(page, "output")).toBe(
      read("function-component.output")
    )
  })
})
