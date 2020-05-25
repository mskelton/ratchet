const { baseUrl } = require("../env")
const { ctrlKey, id, read } = require("../utils")

const outputFixture = read("preserve-prop-types.output")

describe("Preserve PropTypes", () => {
  beforeAll(async () => {
    await page.goto(baseUrl)
  })

  it("should be none by default", async () => {
    const value = await page.$eval(
      id("preserve-prop-types"),
      (el) => el.options[el.selectedIndex].value
    )

    expect(value).toBe("none")
  })

  it("should update the output when changing the selected value", async () => {
    await page.selectOption(id("preserve-prop-types"), "all")
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )

    await page.selectOption(id("preserve-prop-types"), "none")
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", read("function-component.output")]
    )
  })

  it("should respect the option when editing the input", async () => {
    await page.selectOption(id("preserve-prop-types"), "all")

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

  it("should persist the selected value", async () => {
    await page.reload()
    await page.selectOption(id("preserve-prop-types"), "all")
  })

  it("should use the persisted value for the initial value", async () => {
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )
  })
})
