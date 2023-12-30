import React from "react"

interface MyComponentProps {
  bar: string
  foo?: number
}

export class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <span />
  }
}
