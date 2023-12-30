import PropTypes from "prop-types"
import React from "react"

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  a: PropTypes.string,
  b: function () {},
  c: PropTypes.shape({
    d: PropTypes.bool
  })
}
