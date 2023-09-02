import PropTypes from "prop-types"
import React from "react"

export class MyComponent extends React.Component {
  render() {
    return <span />
  }
}

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}
