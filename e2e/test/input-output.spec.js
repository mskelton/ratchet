// @ts-check
const { baseUrl } = require("../env")
const { ctrlKey, getValue, id, read } = require("../utils")

const outputFixture = read("class-component.output")

describe("Input/Output", () => {
  beforeAll(async () => {
    await page.goto(baseUrl)
  })

  it("should have default content", async () => {
    expect(await getValue("input")).toBe(read("function-component.input"))
    expect(await getValue("output")).toBe(read("function-component.output"))
  })

  it("should clear the output when clearing the input", async () => {
    await page.click(id("input"))
    await page.keyboard.down(ctrlKey)
    await page.keyboard.press("a")
    await page.keyboard.up(ctrlKey)
    await page.keyboard.press("Backspace")

    await page.waitForFunction(
      (editorId) => window[editorId].getValue() === "",
      "output"
    )
  })

  it("should update the output when changing the input", async () => {
    const trimmedInput = read("class-component.input")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")

    await page.type(id("input"), trimmedInput)
    await page.waitForFunction(
      ([editorId, expected]) => window[editorId].getValue() === expected,
      ["output", outputFixture]
    )
  })

  it("should not allow editing the output", async () => {
    await page.click(id("output"))
    await page.keyboard.press("Backspace")
    expect(await getValue("output")).toBe(outputFixture)
  })
})
