import { expect, test } from "../fixtures/base.js"
import { clearInput, read } from "../utils.js"

const outputFixture = read("prefer-type-aliases-function-component.output")

test.describe("Prefer Type Aliases", () => {
  test("should be false by default", async ({ page }) => {
    const value = await page.$eval(
      "data-testid=prefer-type-aliases",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el: any) => el.checked
    )

    expect(value).toBe(false)
  })

  test("should update the output when changing the selected value", async ({
    page,
  }) => {
    await page.setChecked("data-testid=prefer-type-aliases", true)
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )

    await page.setChecked("data-testid=prefer-type-aliases", false)
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", read("function-component.output")]
    )
  })

  test("should persist between reloads", async ({ page }) => {
    await test.step("edit the input", async () => {
      await page.getByTestId("prefer-type-aliases").check()
      await clearInput(page)

      const trimmedInput = read("prefer-type-aliases-function-component.input")
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
      await page.getByTestId("prefer-type-aliases").check()
    })

    await test.step("sets the initial value", async () => {
      await page.waitForFunction(
        ([editorId, expected]) => window[editorId].getValue() === expected,
        ["output", outputFixture]
      )
    })
  })
})
