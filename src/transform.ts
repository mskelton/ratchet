import { API, Collection, FileInfo, JSCodeshift } from "jscodeshift"

function removeImport(j: JSCodeshift, source: Collection) {
  source
    .find(j.ImportDeclaration)
    .filter((path) => path.value.source.value === "prop-types")
    .remove()
}

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
