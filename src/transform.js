const { parsePropTypes } = require("./parse-prop-types")

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
function findPropTypes(j, source) {
  return source
    .find(j.AssignmentExpression)
    .filter(
      (path) =>
        path.value.left.type === "MemberExpression" &&
        path.value.left.property.type === "Identifier" &&
        path.value.left.property.name === "propTypes"
    )
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} source
 */
function findStaticPropTypes(j, source) {
  return source
    .find(j.ClassProperty)
    .filter((path) => path.value.static && path.value.key.name === "propTypes")
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} source
 */
function collectPropTypes(j, source) {
  const types = findPropTypes(j, source)
  const staticTypes = findStaticPropTypes(j, source)

  // Store the types to survive after we remove the propTypes
  const results = types
    .paths()
    .concat(staticTypes.paths())
    .map((path) => ({
      component: path.value.left.object.name,
      propTypes: parsePropTypes(j, path.value.right.properties),
    }))

  // Remove the propTypes assignment expression and static propTypes
  types.remove()
  staticTypes.remove()

  return results
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} source
 * @param {{ component: string, propTypes: import('jscodeshift').TSPropertySignature[] }[]} types
 */
function addFunctionTSTypes(j, source, types) {
  const components = source
    .find(j.FunctionDeclaration)
    // Ignore functions without propTypes
    .filter((path) => types.find((t) => t.component === path.value.id.name))

  components.forEach((path) => {
    const componentName = path.value.id.name
    const { propTypes } = types.find((t) => t.component === componentName)
    const typeName = components.length === 1 ? "Props" : `${componentName}Props`

    // Add the TS types before the function
    path.parentPath.insertBefore(
      j.tsTypeAliasDeclaration(
        j.identifier(typeName),
        j.tsTypeLiteral(propTypes)
      )
    )

    // Add the TS types to the props param
    path.value.params[0].typeAnnotation = j.tsTypeReference(
      // For some reason, jscodeshift isn't adding the colon so we have to do
      // that ourselves.
      j.identifier(`: ${typeName}`)
    )
  })
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} source
 * @param {{ component: string, propTypes: import('jscodeshift').TSPropertySignature[] }[]} types
 */
function addClassTSType(j, source, types) {
  const components = source
    .find(j.ClassDeclaration)
    // Ignore classes without propTypes
    .filter((path) => types.find((t) => t.component === path.value.id.name))

  components.forEach((path) => {
    const componentName = path.value.id.name
    const { propTypes } = types.find((t) => t.component === componentName)
    const typeName = components.length === 1 ? "Props" : `${componentName}Props`

    // Add the TS types before the function
    path.parentPath.insertBefore(
      j.tsTypeAliasDeclaration(
        j.identifier(typeName),
        j.tsTypeLiteral(propTypes)
      )
    )

    // Add the TS types to the React.Component super class
    path.value.superTypeParameters = j.tsTypeParameterInstantiation([
      j.tsTypeReference(j.identifier(typeName)),
    ])
  })
}

/**
 * @param {import('jscodeshift').FileInfo} fileInfo
 * @param {import('jscodeshift').API} api
 */
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift
  const source = api.jscodeshift(fileInfo.source)

  // Remove the prop-types import from the top of the file
  removeImport(j, source)

  // Collect prop types from assignment expressions and static prop types
  const types = collectPropTypes(j, source).concat()

  // Add TS types to functions and classes
  addFunctionTSTypes(j, source, types)
  addClassTSType(j, source, types)

  return source.toSource()
}
