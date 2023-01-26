import React from "react"

interface MyComponentProps {
  bar: string
  foo?: number
}

export function MyComponent(props: MyComponentProps) {
  const foo: string = 'bar'
  return <span />
}
