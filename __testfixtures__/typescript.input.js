import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  const foo: string = 'bar'
  return <span />
}

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}
