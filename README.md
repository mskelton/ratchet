# PropTypes to TS

[![Test](https://github.com/mskelton/prop-types-to-ts/workflows/Test/badge.svg?branch=master)](https://github.com/mskelton/prop-types-to-ts/actions?query=workflow%3ATest)
[![GitHub deployments](https://img.shields.io/github/deployments/mskelton/prop-types-to-ts/production?label=Deploy)](https://prop-types.now.sh)

> Codemod to convert React PropTypes to TypeScript types.

## Key Features

- Supports function and class components
- Supports `static propTypes` declarations on class components
- Supports files with multiple components
- Option to remove or preserve PropTypes after converting to TS

## Usage

Run the following command with a file glob that matches the files you want to convert.

```sh
npx jscodeshift -t https://raw.githubusercontent.com/mskelton/prop-types-to-ts/master/transform.js GLOB

# Example
npx jscodeshift -t https://raw.githubusercontent.com/mskelton/prop-types-to-ts/master/transform.js src/**/*.{js,jsx}
```

## Try it Online!

In addition to the CLI, you can use the tool online at [prop-types.now.sh](https://prop-types.now.sh)! Simply paste your input on the left and instantly see the output on the right!

[![Screenshot](web/screenshot.png)](https://prop-types.now.sh)

## Example Input/Output

```ts
// Input
import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}

// Input
import React from "react"

type Props = {
  bar: string
  foo?: number
}

export function MyComponent(props: Props) {
  return <span />
}
```

## Options

### `--preserve-prop-types`

Preserves prop types after converting to TS. There are two available modes: `all` and `unconverted`.

#### `--preserve-prop-types=all`

_CLI alias: `--preserve-prop-types`_

This option will preserve all PropTypes. This is useful for component libraries where you support both TypeScript declarations and PropTypes.

Input:

```js
import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  foo: PropTypes.number,
}
```

Output:

```ts
import PropTypes from "prop-types"
import React from "react"

type Props = {
  foo?: number
}

export function MyComponent(props: Props) {
  return <span />
}

MyComponent.propTypes = {
  foo: PropTypes.number,
}
```

#### `--preserve-prop-types=unconverted`

This option will preserve prop types which could not be fully converted. For example, spread expressions are not converted, and custom validators are converted to `unknown`. This option is useful to preserve these expressions so you can manually review and convert to their TypeScript equivalent.

Input:

```js
import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes,
  foo: PropTypes.number,
  bar(props, propName, componentName) {
    return new Error("Invalid prop")
  },
}
```

Output:

```ts
import PropTypes from "prop-types"
import React from "react"

type Props = {
  foo?: number
  bar: unknown
}

export function MyComponent(props: Props) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes,
  bar(props, propName, componentName) {
    return new Error("Invalid prop")
  },
}
```
