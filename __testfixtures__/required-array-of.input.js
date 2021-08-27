import PropTypes from "prop-types"
import React from "react"

export const MyComponent = (props) => {
  return <span />
}

MyComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired
  ).isRequired
}
