import PropTypes from "prop-types"
import React from "react"

interface MyComponentProps {
  bar: string;
  foo?: number;
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}

MyComponent.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.number,
}
