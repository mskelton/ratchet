import type {
  API,
  Collection,
  FileInfo,
  JSCodeshift,
  Options,
} from "jscodeshift"

let j: JSCodeshift

function getTSTypes(source: Collection) {
  source.forEach((path) => {
    console.log(path)
  })
}

function collectPropTypes(source: Collection) {
  return source
    .find(j.AssignmentExpression)
    .filter(
      (path) => path.get("left", "property", "name").value === "propTypes"
    )
    .map((path) => path.get("right", "properties"))
}

// function collectStaticPropTypes(source: Collection) {}

module.exports = function (file: FileInfo, api: API, options: Options) {
  j = api.jscodeshift

  const source = j(file.source)
  const propTypes = collectPropTypes(source)
  // const staticPropTypes = collectStaticPropTypes(source)
  const tsTypes = getTSTypes(propTypes)

  return source.toSource()
}
