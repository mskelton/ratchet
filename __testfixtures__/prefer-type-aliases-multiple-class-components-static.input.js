import PropTypes from "prop-types"
import React from "react"

export class ComponentA extends React.Component {
  static propTypes = {
    a: PropTypes.string.isRequired,
    b: PropTypes.number,
  }

  render() {
    return <span />
  }
}

export class ComponentB extends React.Component {
  static propTypes = {
    c: PropTypes.array,
    d: PropTypes.object.isRequired,
  }

  render() {
    return <span />
  }
}
