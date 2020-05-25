import React from "react"

type Props = {
  a?: string
};

export function MyComponent(props: Props) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes
}
