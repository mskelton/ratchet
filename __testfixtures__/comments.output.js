import React from "react"

interface MyComponentProps {
  /**
   * A string with a
   * wrapping comment.
   * @example "foo"
   */
  bar: string;
  /**
   * Some number
   * @default 1
   */
  foo?: number;
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}
