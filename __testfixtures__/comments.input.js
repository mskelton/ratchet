import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  /**
   * A string with a
   * wrapping comment.
   * @example "foo"
   */
  bar: PropTypes.string.isRequired,
  /**
   * Some number
   * @default 1
   */
  foo: PropTypes.number,
}
