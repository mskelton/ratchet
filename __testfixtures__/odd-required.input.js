import PropTypes from "prop-types"
import React from "react"

export const MyComponent = (props) => {
  return <span />
}

MyComponent.propTypes = {
  a: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.number.isRequired
  }).isRequired),
  b: PropTypes.objectOf(PropTypes.number.isRequired)
}
