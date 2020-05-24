const { baseUrl } = require("../env")
const { ctrlKey, id, read } = require("../utils")

const outputFixture = read("preserve-prop-types.output")

describe("Preserve PropTypes", () => {
  beforeAll(async () => {
    await page.goto(baseUrl)
  })

  it("should be unchecked by default", async () => {
    const checked = await page.$eval(
      id("preserve-prop-types"),
      (el) => el.checked
    )

    expect(checked).toBe(false)
  })

  it("should update the output when toggling the checkbox", async () => {
    await page.check(id("preserve-prop-types"))
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )

    await page.uncheck(id("preserve-prop-types"))
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", read("function-component.output")]
    )
  })

  it("should respect the option when editing the input", async () => {
    await page.check(id("preserve-prop-types"))

    // Clear the input
    await page.click(id("input"))
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

    await page.type(id("input"), trimmedInput)
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", output]
    )
  })
})
