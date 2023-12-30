import PropTypes from "prop-types"
import React, { forwardRef } from "react"

export const MyComponent = forwardRef((props, ref) => {
  return <span ref={ref} />
})

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}

export function ComponentA(props) {
  return <span />
}

ComponentA.propTypes = {
  a: PropTypes.string.isRequired,
  b: PropTypes.number,
}
