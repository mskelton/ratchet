# Ratchet

[![Test](https://github.com/mskelton/ratchet/workflows/Test/badge.svg?branch=main)](https://github.com/mskelton/ratchet/actions?query=workflow%3ATest)
[![GitHub deployments](https://img.shields.io/github/deployments/mskelton/ratchet/production?label=Deploy)](https://ratchet.mskelton.dev)

Codemod to convert React PropTypes to TypeScript types.

## Key Features

- Supports function and class components
- Supports `static propTypes` declarations on class components
- Supports [`forwardRef`s](https://reactjs.org/docs/forwarding-refs.html)
- Supports files with multiple components
- Copies JSDoc comments to the generated TypeScript types
- Option to remove or preserve PropTypes after converting to TS

## Usage

Thanks to my friends at Codemod, you can easily run Ratchet on your project
using the [Codemod VS Code extension](https://marketplace.visualstudio.com/items?itemName=codemod.codemod-vscode-extension):

<a href="https://go.codemod.com/ratchet" target="_blank">
<img src="https://raw.githubusercontent.com/codemod-com/codemod/main/apps/docs/images/misc/run-in-codemod-badge.svg" alt="Run in Codemod.com" width="200"/>
</a>

> To learn more about using the Codemod platform, [read the docs here](https://go.codemod.com/vsce-docs).
> If you encounter any issues, please [reach out](https://www.codemod.com/community) to my good friends at Codemod.

Or run the following command with a file glob that matches the files you want to
convert.

```bash
npx jscodeshift -t https://go.mskelton.dev/ratchet.ts GLOB

# Example
npx jscodeshift -t https://go.mskelton.dev/ratchet.ts src/**/*.{js,jsx}
```

## Try it Online!

Additionally, you can use Ratchet online at
[ratchet.mskelton.dev](https://ratchet.mskelton.dev)! Simply paste your input on
the left and instantly see the output on the right!

[![Screenshot](web/screenshot.png?v=1)](https://ratchet.mskelton.dev)

## Example: Function Component

Input:

```javascript
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
```

Output:

```tsx
import React from "react"

interface MyComponentProps {
  bar: string
  foo?: number
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}
```

## Options

### `--preserve-prop-types`

Preserves prop types after converting to TS. There are two available modes:
`all` and `unconverted`.

#### `--preserve-prop-types=all`

_CLI alias: `--preserve-prop-types`_

This option will preserve all PropTypes. This is useful for component libraries
where you support both TypeScript declarations and PropTypes.

Input:

```jsx
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

```tsx
import PropTypes from "prop-types"
import React from "react"

interface MyComponentProps {
  foo?: number
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}

MyComponent.propTypes = {
  foo: PropTypes.number,
}
```

#### `--preserve-prop-types=unconverted`

This option will preserve prop types which could not be fully converted. For
example, spread expressions are not converted, and custom validators are
converted to `unknown`. This option is useful to preserve these expressions so
you can manually review and convert to their TypeScript equivalent.

Input:

```jsx
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

```tsx
import PropTypes from "prop-types"
import React from "react"

interface MyComponentProps {
  foo?: number
  bar: unknown
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes,
  bar(props, propName, componentName) {
    return new Error("Invalid prop")
  },
}
```

## `--declaration-style`

Allow to choose between interfaces & type aliases. Default is `interface`.

### `--declaration-style=type`

Create type alias instead of interface.

Input:

```javascript
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
```

Output:

```tsx
import React from "react"

type MyComponentProps = {
  bar: string
  foo?: number
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}
```
