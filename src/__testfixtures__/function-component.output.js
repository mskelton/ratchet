import PropTypes from "prop-types";
import React from "react";

export function MyComponent() {
  return <span />;
}

MyComponent.propTypes = {
  foo: PropTypes.number,
  bar: PropTypes.string.isRequired,
};
