import PropTypes from "prop-types"
import React from "react"

export class MyComponent extends React.Component {
  static propTypes = {
    bar: PropTypes.string.isRequired,
    foo: PropTypes.number,
  }

  render() {
    return <span />
  }
}
