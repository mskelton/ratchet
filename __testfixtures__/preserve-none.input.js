import PropTypes from "prop-types"
import React from "react"

export function ComponentA(props) {
  return <span />
}

ComponentA.propTypes = {
  ...OtherComponent,
  a: PropTypes.string.isRequired,
  b() {}
}

export function ComponentB(props) {
  return <span />
}

ComponentB.propTypes = {
  ...ThisComponent,
  c: PropTypes.number,
  d() {}
}
