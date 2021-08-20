import PropTypes from "prop-types"
import React from "react"

interface MyComponentProps {
  a?: string;
  b?: unknown;
  c?: unknown;
  d?: unknown;
  e?: unknown;
  f?: unknown;
  g?: unknown;
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes,
  b: function () {},
  c: () => {},
  d: PropTypes.arrayOf(function() {}),
  e: PropTypes.arrayOf(() => {}),
  f: PropTypes.objectOf(function() {}),
  g: PropTypes.objectOf(() => {})
}
