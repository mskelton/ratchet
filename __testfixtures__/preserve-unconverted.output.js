import PropTypes from "prop-types"
import React from "react"

type Props = {
  a?: string,
  b?: unknown,
  c?: unknown,
  d?: unknown,
  e?: unknown,
  f?: unknown,
  g?: unknown
};

export function MyComponent(props: Props) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes,
  b: function () {},
  c: () => {},
  d: PropTypes.arrayOf(function() {}),
  e: PropTypes.arrayOf(() => {}),
  f: PropTypes.objectOf(function() {}),
  g: PropTypes.objectOf(() => {}),
}
