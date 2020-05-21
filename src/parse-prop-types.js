const { mapType } = require("./type-mapper")

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
exports.parsePropTypes = (j, properties) => {
  return properties.map((p) => createPropertySignature(j, p))
}
