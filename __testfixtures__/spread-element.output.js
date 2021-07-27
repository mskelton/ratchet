import React from "react"

interface Props {
  a?: string
};

export function MyComponent(props: Props) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes
}
