export const inputSnippet = `
import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}
`.trim()

export const outputSnippet = `
import React from "react"

type Props = {
  bar: string,
  foo?: number
};

export function MyComponent(props: Props) {
  return <span />
}
`.trim()
