import { fileURLToPath } from "node:url"
import * as transform from "../transform.js"
import { defineTest } from "./test-utils.js"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

// --prefer-type-aliases=false && --prefer-type-aliases
;[(null, { "prefer-type-aliases": true })].forEach((options) => {
  let prefix = ""
  if (options) {
    prefix = "prefer-type-aliases-"
  }
  defineTest(__dirname, transform, options, `${prefix}arrow-function`)
  defineTest(__dirname, transform, options, `${prefix}class-component-static`)
  defineTest(__dirname, transform, options, `${prefix}class-component`)
  defineTest(__dirname, transform, options, `${prefix}complex-props`)
  defineTest(__dirname, transform, options, `${prefix}comments`)
  defineTest(__dirname, transform, options, `${prefix}custom-validator`)
  defineTest(__dirname, transform, options, `${prefix}extended-props`)
  defineTest(__dirname, transform, options, `${prefix}forward-ref`)
  defineTest(__dirname, transform, options, `${prefix}forward-ref-and-func`)
  defineTest(__dirname, transform, options, `${prefix}function-and-class`)
  defineTest(__dirname, transform, options, `${prefix}function-component`)
  defineTest(__dirname, transform, options, `${prefix}memo-export`)
  defineTest(__dirname, transform, options, `${prefix}memo`)
  defineTest(
    __dirname,
    transform,
    options,
    `${prefix}multiple-class-components-static`
  )
  defineTest(__dirname, transform, options, `${prefix}multiple-components`)
  defineTest(__dirname, transform, options, `${prefix}no-export`)
  defineTest(__dirname, transform, options, `${prefix}no-prop-types`)
  defineTest(__dirname, transform, options, `${prefix}literal-prop`)

  // This test shouldn't really be needed since `arrayOf(shape({}).isRequired).isRequired`
  // is not really a valid prop type, but since it exists in the wild, we should
  // support it.
  defineTest(__dirname, transform, options, `${prefix}odd-required`)

  // TypeScript is not likely to exist in input files, but we should support if
  // people already started to migrate to TS. This does exist in the wild.
  defineTest(__dirname, transform, options, `${prefix}typescript`)
})

// --preserve-prop-types
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": true },
  "preserve-prop-types"
)

// --preserve-prop-types=all
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": "all" },
  "preserve-prop-types"
)

// --preserve-prop-types=none
defineTest(__dirname, transform, null, "preserve-none")
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": "none" },
  "preserve-none"
)

// --preserve-prop-types=unconverted
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": "unconverted" },
  "preserve-unconverted"
)
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": "unconverted" },
  "spread-element"
)
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": "unconverted" },
  "preserve-unconverted-static"
)

// When no unconverted PropTypes exist, should match --preserve-prop-types=none
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": "unconverted" },
  "complex-props"
)
// Should take PropTypes.shape into account when calculating unconverted propTypes
defineTest(
  __dirname,
  transform,
  { "preserve-prop-types": "unconverted" },
  "preserve-unconverted-shape"
)
