import { expect, test } from "../fixtures/base"
import { ctrlKey, read } from "../utils"

const outputFixture = read("preserve-prop-types.output")

test.describe("Preserve PropTypes", () => {
  test("should be none by default", async ({ page }) => {
    const value = await page.$eval(
      "data-testid=preserve-prop-types",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el: any) => el.options[el.selectedIndex].value
    )

    expect(value).toBe("none")
  })

  test("should update the output when changing the selected value", async ({
    page,
  }) => {
    await page.selectOption("data-testid=preserve-prop-types", "all")
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )

    await page.selectOption("data-testid=preserve-prop-types", "none")
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", read("function-component.output")]
    )
  })

  test("should respect the option when editing the input", async ({ page }) => {
    await page.selectOption("data-testid=preserve-prop-types", "all")

    // Clear the input
    await page.click("data-testid=input")
    await page.keyboard.down(ctrlKey)
    await page.keyboard.press("a")
    await page.keyboard.up(ctrlKey)
    await page.keyboard.press("Backspace")

    const trimmedInput = read("preserve-prop-types.input")
      .replace("PropTypes.number", "PropTypes.bool")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")

    const output = outputFixture
      .replace("PropTypes.number", "PropTypes.bool")
      .replace("number", "boolean")

    await page.type("data-testid=input", trimmedInput)
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", output]
    )
  })

  test("should persist the selected value", async ({ page }) => {
    await page.reload()
    await page.selectOption("data-testid=preserve-prop-types", "all")
  })

  test("should use the persisted value for the initial value", async ({
    page,
  }) => {
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )
  })
})
