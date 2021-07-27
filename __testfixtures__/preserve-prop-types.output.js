import PropTypes from "prop-types"
import React from "react"

interface Props {
  bar: string,
  foo?: number
};

export function MyComponent(props: Props) {
  return <span />
}

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}
