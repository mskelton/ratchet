# Ratchet

[![Test](https://github.com/mskelton/ratchet/workflows/Test/badge.svg?branch=main)](https://github.com/mskelton/ratchet/actions?query=workflow%3ATest)
[![GitHub deployments](https://img.shields.io/github/deployments/mskelton/ratchet/production?label=Deploy)](https://prop-types.vercel.app)

Codemod to convert React PropTypes to TypeScript types.

## Key Features

- Supports function and class components
- Supports `static propTypes` declarations on class components
- Supports [`forwardRef`s](https://reactjs.org/docs/forwarding-refs.html)
- Supports files with multiple components
- Copies JSDoc comments to the generated TypeScript types
- Option to remove or preserve PropTypes after converting to TS
- Choose between interface and type alias

## Usage

Run the following command with a file glob that matches the files you want to
convert.

```bash
npx jscodeshift -t https://mskelton.dev/ratchet.ts GLOB

# Example
npx jscodeshift -t https://mskelton.dev/ratchet.ts src/**/*.{js,jsx}
```

## Try it Online!

In addition to the CLI, you can use Ratchet online at
[mskelton.dev/ratchet](https://mskelton.dev/ratchet)! Simply paste your input on
the left and instantly see the output on the right!

[![Screenshot](web/screenshot.png?v=1)](https://mskelton.dev/ratchet)

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

### `--prefer-type-aliases`

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
