const { defineTest } = require("jscodeshift/dist/testUtils")

defineTest(__dirname, "transform", null, "function-component")
defineTest(__dirname, "transform", null, "complex-props")
