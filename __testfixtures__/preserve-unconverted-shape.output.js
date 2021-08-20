import React from "react"

interface MyComponentProps {
  a?: string;
  b?: unknown;
  c?: {
    d?: boolean
  };
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}

MyComponent.propTypes = {
  b: function () {}
}
