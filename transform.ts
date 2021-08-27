import type { NodePath } from "ast-types/lib/node-path"
import type {
  API,
  Collection,
  FileInfo,
  JSCodeshift,
  Options,
  TSAnyKeyword,
  TSFunctionType,
} from "jscodeshift"

let j: JSCodeshift
let options: {
  preservePropTypes: "none" | "unconverted" | "all"
}

function reactType(type: string) {
  return j.tsQualifiedName(j.identifier("React"), j.identifier(type))
}

type TSType = {
  key: string
  type: TSAnyKeyword | TSFunctionType
  required: boolean
}

function createPropertySignature({ key, required, type }: TSType) {
  if (type.type === "TSFunctionType") {
    return j.tsMethodSignature.from({
      key: j.identifier(key),
      optional: !required,
      parameters: type.parameters,
      typeAnnotation: type.typeAnnotation,
    })
  }

  return j.tsPropertySignature(
    j.identifier(key),
    j.tsTypeAnnotation(type),
    !required
  )
}

function isCustomValidator(path: NodePath) {
  return (
    path.get("type").value === "FunctionExpression" ||
    path.get("type").value === "ArrowFunctionExpression"
  )
}

const resolveRequired = (path: NodePath) =>
  isRequired(path) ? path.get("object") : path

function getTSType(path: NodePath) {
  const { value: name } =
    path.get("type").value === "MemberExpression"
      ? path.get("property", "name")
      : path.get("callee", "property", "name")

  switch (name) {
    case "func": {
      const restElement = j.restElement.from({
        argument: j.identifier("args"),
        typeAnnotation: j.tsTypeAnnotation(j.tsArrayType(j.tsUnknownKeyword())),
      })

      return j.tsFunctionType.from({
        parameters: [restElement],
        typeAnnotation: j.tsTypeAnnotation(j.tsUnknownKeyword()),
      })
    }

    case "arrayOf": {
      const type = path.get("arguments", 0)
      return isCustomValidator(type)
        ? j.tsUnknownKeyword()
        : j.tsArrayType(getTSType(resolveRequired(type)))
    }

    case "objectOf": {
      const type = path.get("arguments", 0)
      return isCustomValidator(type)
        ? j.tsUnknownKeyword()
        : j.tsTypeReference(
            j.identifier("Record"),
            j.tsTypeParameterInstantiation([
              j.tsStringKeyword(),
              getTSType(resolveRequired(type)),
            ])
          )
    }

    case "oneOf":
      return j.tsUnionType(
        path
          .get("arguments", 0, "elements")
          .value.map(({ value }) => j.tsLiteralType(j.stringLiteral(value)))
      )

    case "oneOfType":
      return j.tsUnionType(path.get("arguments", 0, "elements").map(getTSType))

    case "instanceOf":
      return j.tsTypeReference(
        j.identifier(path.get("arguments", 0, "name").value)
      )

    case "shape":
    case "exact":
      return j.tsTypeLiteral(
        path
          .get("arguments", 0, "properties")
          .map(mapType)
          .map(createPropertySignature)
      )
  }

  const map = {
    any: j.tsAnyKeyword(),
    array: j.tsArrayType(j.tsUnknownKeyword()),
    bool: j.tsBooleanKeyword(),
    element: j.tsTypeReference(reactType("ReactElement")),
    elementType: j.tsTypeReference(reactType("ElementType")),
    node: j.tsTypeReference(reactType("ReactNode")),
    number: j.tsNumberKeyword(),
    object: j.tsObjectKeyword(),
    string: j.tsStringKeyword(),
    symbol: j.tsSymbolKeyword(),
  }

  return map[name] || j.tsUnknownKeyword()
}

const isRequired = (path: NodePath) =>
  path.get("type").value === "MemberExpression" &&
  path.get("property", "name").value === "isRequired"

function mapType(path: NodePath): TSType {
  const required = isRequired(path.get("value"))
  const key = path.get("key", "name").value
  const type = getTSType(
    required ? path.get("value", "object") : path.get("value")
  )

  // If all types should be removed or the type was able to be converted,
  // we remove the type.
  if (options.preservePropTypes !== "all" && type.type !== "TSUnknownKeyword") {
    path.replace()
  }

  return { key, required, type }
}

type CollectedTypes = {
  component: string
  types: TSType[]
}[]

function getTSTypes(
  source: Collection,
  getComponentName: (path: NodePath) => string
) {
  const collected = [] as CollectedTypes

  source.forEach((path) => {
    collected.push({
      component: getComponentName(path),
      types: path
        .filter(({ value }) => value.type === "Property", null)
        .map(mapType, null),
    })
  })

  return collected
}

function getFunctionParent(path: NodePath) {
  return path.parent.get("type").value === "Program"
    ? path
    : getFunctionParent(path.parent)
}

function getComponentName(path: NodePath) {
  const root =
    path.get("type").value === "ArrowFunctionExpression" ? path.parent : path

  return root.get("id", "name").value
}

function createInterface(path: NodePath, componentTypes: CollectedTypes) {
  const componentName = getComponentName(path)
  const types = componentTypes.find((t) => t.component === componentName)
  const typeName = `${componentName}Props`

  // If the component doesn't have propTypes, ignore it
  if (!types) return

  // Add the TS types before the function/class
  getFunctionParent(path).insertBefore(
    j.tsInterfaceDeclaration(
      j.identifier(typeName),
      j.tsInterfaceBody(types.types.map(createPropertySignature))
    )
  )

  return typeName
}

function addFunctionTSTypes(
  source: Collection,
  componentTypes: CollectedTypes
) {
  source.forEach((path) => {
    const typeName = createInterface(path, componentTypes)
    if (!typeName) return

    // Add the TS types to the props param
    path.get("params", 0).value.typeAnnotation = j.tsTypeReference(
      // For some reason, jscodeshift isn't adding the colon so we have to do
      // that ourselves.
      j.identifier(`: ${typeName}`)
    )
  })
}

function addClassTSTypes(source: Collection, componentTypes: CollectedTypes) {
  source.find(j.ClassDeclaration).forEach((path) => {
    const typeName = createInterface(path, componentTypes)
    if (!typeName) return

    // Add the TS types to the React.Component super class
    path.value.superTypeParameters = j.tsTypeParameterInstantiation([
      j.tsTypeReference(j.identifier(typeName)),
    ])
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

function collectStaticPropTypes(source: Collection) {
  return source
    .find(j.ClassProperty)
    .filter((path) => !!path.value.static)
    .filter((path) => path.get("key", "name").value === "propTypes")
    .map((path) => path.get("value", "properties"))
}

function cleanup(
  source: Collection,
  propTypes: Collection,
  staticPropTypes: Collection
) {
  propTypes.forEach((path) => {
    if (!path.parent.get("right", "properties", "length").value) {
      path.parent.prune()
    }
  })

  staticPropTypes.forEach((path) => {
    if (!path.parent.get("value", "properties", "length").value) {
      path.parent.prune()
    }
  })

  const propTypesUsages = source
    .find(j.MemberExpression)
    .filter((path) => path.get("object", "name").value === "PropTypes")

  // We can remove the import without caring about the preserve-prop-types
  // option since the criteria for removal is that no PropTypes.* member
  // expressions exist.
  if (propTypesUsages.length === 0) {
    source
      .find(j.ImportDeclaration)
      .filter((path) => path.value.source.value === "prop-types")
      .remove()
  }
}

export default function (file: FileInfo, api: API, opts: Options) {
  j = api.jscodeshift
  const source = j(file.source)

  // Parse the CLI options
  options = {
    preservePropTypes:
      opts["preserve-prop-types"] === true
        ? "all"
        : opts["preserve-prop-types"] || "none",
  }

  const propTypes = collectPropTypes(source)
  const tsTypes = getTSTypes(
    propTypes,
    (path) => path.parent.get("left", "object", "name").value
  )

  const staticPropTypes = collectStaticPropTypes(source)
  const staticTSTypes = getTSTypes(
    staticPropTypes,
    (path) => path.parent.parent.parent.value.id.name
  )

  addFunctionTSTypes(source.find(j.FunctionDeclaration), tsTypes)
  addFunctionTSTypes(source.find(j.FunctionExpression), tsTypes)
  addFunctionTSTypes(source.find(j.ArrowFunctionExpression), tsTypes)
  addClassTSTypes(source, tsTypes)
  addClassTSTypes(source, staticTSTypes)

  if (options.preservePropTypes === "none") {
    propTypes.remove()
    staticPropTypes.remove()
  }

  // Remove empty propTypes expressions and imports
  cleanup(source, propTypes, staticPropTypes)

  return source.toSource()
}
