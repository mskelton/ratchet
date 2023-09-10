import { expect, test } from "../fixtures/base.js"
import { clearInput, read } from "../utils.js"

const outputFixture = read("declaration-style-type.output")

test.describe("Declaration Style", () => {
  test("should be interface by default", async ({ page }) => {
    const value = await page.$eval(
      "data-testid=declaration-style",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el: any) => el.options[el.selectedIndex].value
    )

    expect(value).toBe("interface")
  })

  test("should update the output when changing the selected value", async ({
    page,
  }) => {
    await page.selectOption("data-testid=declaration-style", "type")
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )

    await page.selectOption("data-testid=declaration-style", "interface")
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", read("function-component.output")]
    )
  })

  test("should persist between reloads", async ({ page }) => {
    await test.step("edit the input", async () => {
      await page.selectOption("data-testid=declaration-style", "type")
      await clearInput(page)

      const trimmedInput = read("declaration-style-type.input")
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

    await test.step("persists the selected value", async () => {
      await page.reload()
      await page.selectOption("data-testid=declaration-style", "type")
    })

    await test.step("sets the initial value", async () => {
      await page.waitForFunction(
        ([editorId, expected]) => window[editorId].getValue() === expected,
        ["output", outputFixture]
      )
    })
  })
})
