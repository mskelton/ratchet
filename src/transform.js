// @ts-check

/**
 * Removes the prop-types import from the file
 *
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} source
 */
function removeImport(j, source) {
  source
    .find(j.ImportDeclaration)
    .filter((path) => path.value.source.value === "prop-types")
    .remove()
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} source
 */
function replacePropTypes(j, source) {}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} source
 */
function replaceStaticPropTypes(j, source) {}

/**
 * @param {import('jscodeshift').FileInfo} fileInfo
 * @param {import('jscodeshift').API} api
 */
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift
  const source = api.jscodeshift(fileInfo.source)

  removeImport(j, source)
  replacePropTypes(j, source)
  replaceStaticPropTypes(j, source)

  return source.toSource()
}
