const { defineTest } = require("jscodeshift/dist/testUtils")

defineTest(__dirname, "transform", null, "arrow-function")
defineTest(__dirname, "transform", null, "class-component-static")
defineTest(__dirname, "transform", null, "class-component")
defineTest(__dirname, "transform", null, "complex-props")
defineTest(__dirname, "transform", null, "custom-validator")
defineTest(__dirname, "transform", null, "function-and-class")
defineTest(__dirname, "transform", null, "function-component")
defineTest(__dirname, "transform", null, "memo-export")
defineTest(__dirname, "transform", null, "memo")
defineTest(__dirname, "transform", null, "multiple-class-components-static")
defineTest(__dirname, "transform", null, "multiple-components")
defineTest(__dirname, "transform", null, "no-export")
defineTest(__dirname, "transform", null, "no-prop-types")

// This test shouldn't really be needed since `arrayOf(shape({}).isRequired).isRequired`
// is not really a valid prop type, but since it exists in the wild, we should
// support it.
defineTest(__dirname, "transform", null, "required-array-of")

// TypeScript is not likely to exist in input files, but we should support if
// people already started to migrate to TS. This does exist in the wild.
defineTest(__dirname, "transform", null, "typescript")

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
