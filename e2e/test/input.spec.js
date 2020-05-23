const fs = require("fs")

const id = (testId) => `[data-testid="${testId}"]`
const read = (fixture) =>
  fs.readFileSync(`../__testfixtures__/${fixture}.js`, "utf-8")

const defaultInput = read("function-component.input")
const input = read("class-component.input")
const output = read("class-component.output")

describe("Input", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080")
  })

  it("should have default content", async () => {
    await expect(id("input")).toEqualValue(defaultInput)
  })
})

// describe("Input", () => {
//   beforeEach(() => {
//     cy.visit("/")
//   })

//   it("should have default content", () => {
//     // cy.findByTestId("input").contains('import PropTypes from "prop-types"')
//   })

//   it("should update the output when changing the input", () => {
//     cy.window().then((win) => win.editor.setValue(""))
//     cy.get('[data-testid="input"] .CodeMirror textarea').type(input, force)
//     cy.get('[data-testid="output"] .CodeMirror textarea').contains(output)
//   })
// })
