import PropTypes from "prop-types"
import React from "react"

export function ComponentA(props) {
  return <span />
}

ComponentA.propTypes = {
  a: PropTypes.string.isRequired,
  b: PropTypes.number,
}

export class ComponentB extends React.Component {
  render() {
    return <span />
  }
}

ComponentB.propTypes = {
  c: PropTypes.array,
  d: PropTypes.object.isRequired,
}
