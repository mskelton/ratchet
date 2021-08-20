import React from "react"

interface MyComponentProps {
  a?: string;
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}

MyComponent.propTypes = {
  ...OtherComponent.propTypes
}
