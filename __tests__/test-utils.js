import { expect, it } from "@jest/globals"
import jscodeshift from "jscodeshift"
import fs from "node:fs/promises"
import path from "node:path"

export function applyTransform(mod, options, input) {
  const transform = mod.default ? mod.default : mod

  let j = jscodeshift
  if (mod.parser) {
    j = jscodeshift.withParser(mod.parser)
  }

  const output = transform(
    input,
    { j, jscodeshift: j, stats: () => {} },
    options || {}
  )

  return (output || "").trim()
}

export function runInlineTest(mod, options, input, expectedOutput) {
  const output = applyTransform(mod, options, input)
  expect(output).toEqual(expectedOutput.trim())
  return output
}

async function runTest(dirName, mod, options, testFilePrefix) {
  const fixtureDir = path.join(dirName, "..", "__testfixtures__")
  const inputPath = path.join(fixtureDir, `${testFilePrefix}.input.js`)

  const source = await fs.readFile(inputPath, "utf8")
  const expectedOutput = await fs.readFile(
    path.join(fixtureDir, `${testFilePrefix}.output.js`),
    "utf8"
  )

  runInlineTest(mod, options, { path: inputPath, source }, expectedOutput)
}

export function defineTest(dirName, mod, options, testFilePrefix, only) {
  const fn = only ? it.only : it
  const testName = testFilePrefix
    ? `transforms correctly using "${testFilePrefix}" data`
    : "transforms correctly"

  fn(testName, async () => {
    await runTest(dirName, mod, options, testFilePrefix)
  })
}
