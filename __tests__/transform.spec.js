const { defineTest } = require("jscodeshift/dist/testUtils")

defineTest(__dirname, "transform", null, "function-component")
defineTest(__dirname, "transform", null, "class-component")
defineTest(__dirname, "transform", null, "complex-props")
defineTest(__dirname, "transform", null, "multiple-components")
defineTest(__dirname, "transform", null, "class-component-static")
defineTest(__dirname, "transform", null, "multiple-class-components-static")
defineTest(__dirname, "transform", null, "function-and-class")

// Options
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": true },
  "preserve-prop-types"
)
