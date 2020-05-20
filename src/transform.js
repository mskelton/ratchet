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
function replacePropTypes(j: JSCodeshift, source: Collection) {}

function replaceStaticPropTypes(j: JSCodeshift, source: Collection) {}

module.exports = function (fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift
  const source = api.jscodeshift(fileInfo.source)

  removeImport(j, source)
  replacePropTypes(j, source)
  replaceStaticPropTypes(j, source)

  return source.toSource()
}
