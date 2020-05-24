const { defineTest } = require("jscodeshift/dist/testUtils")

defineTest(__dirname, "transform", null, "function-component")
defineTest(__dirname, "transform", null, "class-component")
defineTest(__dirname, "transform", null, "complex-props")
defineTest(__dirname, "transform", null, "multiple-components")
defineTest(__dirname, "transform", null, "class-component-static")
defineTest(__dirname, "transform", null, "multiple-class-components-static")
defineTest(__dirname, "transform", null, "function-and-class")
defineTest(__dirname, "transform", null, "custom-validator")

// --preserve-prop-types
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": true },
  "preserve-prop-types"
)

// --preserve-prop-types=all
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "all" },
  "preserve-prop-types"
)

// --preserve-prop-types=custom
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "custom-validators" },
  "preserve-custom-validators"
)

// --preserve-prop-types=custom
// When no custom validators exist, should match --preserve-prop-types=all
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "custom-validators" },
  "preserve-prop-types"
)
