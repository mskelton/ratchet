import PropTypes from "prop-types"
import React from "react"

type Props = {

}

export function MyComponent(props) {
  return <span />
}

MyComponent.propTypes = {
  b: function () {},
  c: () => {},
  d: PropTypes.arrayOf(function() {}),
  e: PropTypes.arrayOf(() => {}),
  f: PropTypes.objectOf(function() {}),
  g: PropTypes.objectOf(() => {}),
  h: PropTypes.arrayOf(function() {}).isRequired,
  i: PropTypes.arrayOf(() => {}).isRequired,
  j: PropTypes.objectOf(function() {}).isRequired,
  k: PropTypes.objectOf(() => {}).isRequired
}
