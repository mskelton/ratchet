const fs = require("fs")
const { baseUrl } = require("../env")

const read = (fixture) =>
  fs.readFileSync(`../__testfixtures__/${fixture}.js`, "utf-8").trim()

const defaultInput = read("function-component.input")
const defaultOutput = read("function-component.output")

const inputFixture = read("class-component.input")
const outputFixture = read("class-component.output")

const id = (testId) => `[data-testid="${testId}"]`

const getValue = (editorId) =>
  page.evaluate((editorId) => window[editorId].getValue(), editorId)

console.log("baseUrl", baseUrl)
console.log("defaultInput", defaultInput)
console.log("defaultOutput", defaultOutput)

describe("Input/Output", () => {
  beforeAll(async () => {
    await page.goto(baseUrl)
  })

  it("should have default content", async () => {
    expect(await getValue("input")).toBe(defaultInput)
    expect(await getValue("output")).toBe(defaultOutput)
  })

  it("should clear the output when clearing the input", async () => {
    await page.click(id("input"))
    await page.keyboard.down("Meta")
    await page.keyboard.press("a")
    await page.keyboard.up("Meta")
    await page.keyboard.press("Backspace")

    await page.waitForFunction(
      (editorId) => window[editorId].getValue() === "",
      "output"
    )
  })

  it("should update the output when changing the input", async () => {
    const trimmedInput = inputFixture
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
