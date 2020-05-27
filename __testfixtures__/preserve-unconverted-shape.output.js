import React from "react"

type Props = {
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
