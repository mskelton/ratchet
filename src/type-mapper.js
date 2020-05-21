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
exports.mapType = (j, type) => {
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
