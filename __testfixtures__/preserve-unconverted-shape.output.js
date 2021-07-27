import React from "react"

interface Props {
  a?: string,
  b?: unknown,
  c?: {
    d?: boolean
  }
};

export function MyComponent(props: Props) {
  return <span />
}

MyComponent.propTypes = {
  b: function () {}
}
