const { defineTest } = require("jscodeshift/dist/testUtils")

defineTest(__dirname, "transform", null, "function-component")
defineTest(__dirname, "transform", null, "class-component")
defineTest(__dirname, "transform", null, "complex-props")
defineTest(__dirname, "transform", null, "multiple-components")
defineTest(__dirname, "transform", null, "class-component-static")
defineTest(__dirname, "transform", null, "multiple-class-components-static")
defineTest(__dirname, "transform", null, "function-and-class")
defineTest(__dirname, "transform", null, "custom-validator")
defineTest(__dirname, "transform", null, "no-prop-types")

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

// --preserve-prop-types=none
defineTest(__dirname, "transform", null, "preserve-none")
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "none" },
  "preserve-none"
)

// --preserve-prop-types=unconverted
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "unconverted" },
  "preserve-unconverted"
)
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "unconverted" },
  "spread-element"
)
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "unconverted" },
  "preserve-unconverted-static"
)

// When no unconverted PropTypes exist, should match --preserve-prop-types=none
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "unconverted" },
  "complex-props"
)
// Should take PropTypes.shape into account when calculating unconverted propTypes
defineTest(
  __dirname,
  "transform",
  { "preserve-prop-types": "unconverted" },
  "preserve-unconverted-shape"
)
