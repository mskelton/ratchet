import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  a: PropTypes.string,
  a: function (props, propName, componentName) {},
  b: (props, propName, componentName) => {},
  d(props, propName, componentName) {},
}
