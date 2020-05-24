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

// --preserve-prop-types=unconverted
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "unconverted" },
  "preserve-unconverted"
)

// --preserve-prop-types=unconverted
// When no unconverted PropTypes exist, should match --preserve-prop-types=all
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "unconverted" },
  "preserve-prop-types"
)
