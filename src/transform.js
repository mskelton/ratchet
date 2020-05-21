/**
 * @param {import('jscodeshift').JSCodeshift} j
 */
function getFunctionType(j) {
  const restElement = j.restElement.from({
    argument: j.identifier("args"),
    typeAnnotation: j.tsTypeAnnotation(j.tsArrayType(j.tsUnknownKeyword())),
  })

  return j.tsFunctionType.from({
    parameters: [restElement],
    typeAnnotation: j.tsTypeAnnotation(j.tsUnknownKeyword()),
  })
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {string} type
 */
function reactType(j, type) {
  return j.tsQualifiedName(j.identifier("React"), j.identifier(type))
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {string} type
 */
function mapType(j, type) {
  const map = {
    any: j.tsAnyKeyword(),
    array: j.tsArrayType(j.tsUnknownKeyword()),
    bool: j.tsBooleanKeyword(),
    element: j.tsTypeReference(reactType(j, "ReactElement")),
    elementType: j.tsTypeReference(reactType(j, "ElementType")),
    func: getFunctionType(j),
    node: j.tsTypeReference(reactType(j, "ReactNode")),
    number: j.tsNumberKeyword(),
    object: j.tsObjectKeyword(),
    string: j.tsStringKeyword(),
    symbol: j.tsSymbolKeyword(),
  }

  return map[type] || j.tsUnknownKeyword()
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').CallExpression} node
 */
function getComplexTSType(j, node) {
  switch (node.callee.property.name) {
    case "arrayOf":
      return j.tsArrayType(mapType(j, node.arguments[0].property.name))

    case "objectOf":
      return j.tsTypeReference(
        j.identifier("Record"),
        j.tsTypeParameterInstantiation([
          j.tsStringKeyword(),
          mapType(j, node.arguments[0].property.name),
        ])
      )

    case "oneOf":
      return j.tsUnionType(
        node.arguments[0].elements.map(({ value }) =>
          j.tsLiteralType(j.stringLiteral(value))
        )
      )

    case "oneOfType":
      return j.tsUnionType(
        node.arguments[0].elements.map((e) => convertToTSType(j, e))
      )

    case "shape":
    case "exact":
      return j.tsTypeLiteral(
        node.arguments[0].properties.map((p) => createPropertySignature(j, p))
      )
  }
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').CallExpression | import('jscodeshift').MemberExpression} node
 */
function convertToTSType(j, node) {
  return node.type === "MemberExpression"
    ? mapType(j, node.property.name)
    : getComplexTSType(j, node)
}

/**
 * @param {import('jscodeshift')} j
 * @param {import('jscodeshift').CallExpression | import('jscodeshift').MemberExpression} property
 */
function createPropertySignature(j, property) {
  const required =
    property.value.type === "MemberExpression" &&
    property.value.property.name === "isRequired"

  return j.tsPropertySignature(
    j.identifier(property.key.name),
    j.tsTypeAnnotation(
      convertToTSType(j, required ? property.value.object : property.value)
    ),
    !required
  )
}

/**
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Property[]} properties
 */
function parsePropTypes(j, properties) {
  return properties.map((p) => createPropertySignature(j, p))
}

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
  const results = types.paths().map((path) => ({
    component: path.value.left.object.name,
    propTypes: parsePropTypes(j, path.value.right.properties),
  }))

  const staticResults = staticTypes.paths().map((path) => {
    return {
      component: path.parent.parent.value.id.name,
      propTypes: parsePropTypes(j, path.value.value.properties),
    }
  })

  // Remove the propTypes assignment expression and static propTypes
  types.remove()
  staticTypes.remove()

  return results.concat(staticResults)
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
    const typeName = types.length === 1 ? "Props" : `${componentName}Props`

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
    const typeName = types.length === 1 ? "Props" : `${componentName}Props`

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
