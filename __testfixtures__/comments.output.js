import React from "react"

interface MyComponentProps {
  /**
   * A string with a
   * wrapping comment.
   * @example "foo"
   */
  bar: string;
  /**
   * Some function
   */
  foo?(...args: unknown[]): unknown;
}

export function MyComponent(props: MyComponentProps) {
  return <span />
}
