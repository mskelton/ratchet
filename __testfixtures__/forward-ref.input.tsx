import PropTypes from "prop-types"
import React from "react"

const MyComponent = React.forwardRef((props, ref) => {
  return <span ref={ref} />
})

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}

export default MyComponent
