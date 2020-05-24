// These variables are defined globally so we don't have to pass them
// through many layers of function calls.

/** @type {import('jscodeshift').JSCodeshift} */
let j

const opts = {
  preservePropTypes: false,
}

function getFunctionType() {
  const restElement = j.restElement.from({
    argument: j.identifier("args"),
    typeAnnotation: j.tsTypeAnnotation(j.tsArrayType(j.tsUnknownKeyword())),
  })

  return j.tsFunctionType.from({
    parameters: [restElement],
    typeAnnotation: j.tsTypeAnnotation(j.tsUnknownKeyword()),
  })
}

/** @param {string} type */
function reactType(type) {
  return j.tsQualifiedName(j.identifier("React"), j.identifier(type))
}

/** @param {import('ast-types/gen/kinds').ExpressionKind} node */
const isFunction = (node) =>
  node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression"

/**
 * @param {string} type
 */
function mapType(type) {
  const map = {
    any: j.tsAnyKeyword(),
    array: j.tsArrayType(j.tsUnknownKeyword()),
    bool: j.tsBooleanKeyword(),
    element: j.tsTypeReference(reactType("ReactElement")),
    elementType: j.tsTypeReference(reactType("ElementType")),
    func: getFunctionType(j),
    node: j.tsTypeReference(reactType("ReactNode")),
    number: j.tsNumberKeyword(),
    object: j.tsObjectKeyword(),
    string: j.tsStringKeyword(),
    symbol: j.tsSymbolKeyword(),
  }

  return map[type] || j.tsUnknownKeyword()
}

/**
 * @param {import('jscodeshift').CallExpression} node
 */
function getComplexTSType(node) {
  switch (node.callee.property.name) {
    case "arrayOf":
      return isFunction(node.arguments[0])
        ? j.tsUnknownKeyword()
        : j.tsArrayType(mapType(node.arguments[0].property.name))

    case "objectOf":
      return isFunction(node.arguments[0])
        ? j.tsUnknownKeyword()
        : j.tsTypeReference(
            j.identifier("Record"),
            j.tsTypeParameterInstantiation([
              j.tsStringKeyword(),
              mapType(node.arguments[0].property.name),
            ])
          )

    case "oneOf":
      return j.tsUnionType(
        node.arguments[0].elements.map(({ value }) =>
          j.tsLiteralType(j.stringLiteral(value))
        )
      )

    case "oneOfType":
      return j.tsUnionType(node.arguments[0].elements.map(convertToTSType))

    case "instanceOf":
      return j.tsTypeReference(j.identifier(node.arguments[0].name))

    case "shape":
    case "exact":
      return j.tsTypeLiteral(
        node.arguments[0].properties.map(createPropertySignature)
      )
  }
}

/**
 * @param {import('jscodeshift').CallExpression | import('jscodeshift').MemberExpression} node
 */
function convertToTSType(node) {
  return node.type === "MemberExpression"
    ? mapType(node.property.name)
    : isFunction(node)
    ? j.tsUnknownKeyword()
    : getComplexTSType(node)
}

/**
 * @param {import('jscodeshift').CallExpression | import('jscodeshift').MemberExpression} property
 */
function createPropertySignature(property) {
  const required =
    property.value.type === "MemberExpression" &&
    property.value.property.name === "isRequired"

  return j.tsPropertySignature(
    j.identifier(property.key.name),
    j.tsTypeAnnotation(
      convertToTSType(required ? property.value.object : property.value)
    ),
    !required
  )
}

/**
 * Removes the prop-types import from the file
 *
 * @param {import('jscodeshift').Collection} source
 */
function removeImport(source) {
  source
    .find(j.ImportDeclaration)
    .filter((path) => path.value.source.value === "prop-types")
    .remove()
}

/**
 * @param {import('jscodeshift').Collection} source
 */
function findPropTypes(source) {
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
 * @param {import('jscodeshift').Collection} source
 */
function findStaticPropTypes(source) {
  return source
    .find(j.ClassProperty)
    .filter((path) => path.value.static && path.value.key.name === "propTypes")
}

/**
 * @param {import('jscodeshift').Collection} source
 */
function collectPropTypes(source) {
  const types = findPropTypes(source)
  const staticTypes = findStaticPropTypes(source)

  // Store the types to survive after we remove the propTypes
  const results = types.paths().map((path) => ({
    component: path.value.left.object.name,
    propTypes: path.value.right.properties.map(createPropertySignature),
  }))

  const staticResults = staticTypes.paths().map((path) => {
    return {
      component: path.parent.parent.value.id.name,
      propTypes: path.value.value.properties.map(createPropertySignature),
    }
  })

  // Remove the propTypes assignment expression and static propTypes
  if (!opts.preservePropTypes) {
    types.remove()
    staticTypes.remove()
  }

  return results.concat(staticResults)
}

/**
 * @param {import('jscodeshift').Collection} source
 * @param {{ component: string, propTypes: import('jscodeshift').TSPropertySignature[] }[]} types
 */
function addFunctionTSTypes(source, types) {
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
 * @param {import('jscodeshift').Collection} source
 * @param {{ component: string, propTypes: import('jscodeshift').TSPropertySignature[] }[]} types
 */
function addClassTSType(source, types) {
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
 * @param {import('jscodeshift').Options} opts
 */
module.exports = function (fileInfo, api, options) {
  j = api.jscodeshift
  opts.preservePropTypes = options["preserve-prop-types"]

  const source = api.jscodeshift(fileInfo.source)

  // Remove the prop-types import from the top of the file
  if (!opts.preservePropTypes) {
    removeImport(source)
  }

  // Collect prop types from assignment expressions and static prop types
  const types = collectPropTypes(source).concat()

  // Add TS types to functions and classes
  addFunctionTSTypes(source, types)
  addClassTSType(source, types)

  return source.toSource()
}
