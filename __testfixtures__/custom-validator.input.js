import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  a: PropTypes.string,
  a: function () {},
  b: () => {},
  e: PropTypes.arrayOf(function() {}),
  f: PropTypes.arrayOf(() => {}),
  g: PropTypes.objectOf(function() {}),
  h: PropTypes.objectOf(() => {})
}
