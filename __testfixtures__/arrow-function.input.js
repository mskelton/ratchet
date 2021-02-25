import PropTypes from "prop-types"
import React from "react"

export const MyComponent = (props) => {
  return <span />
}

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}
