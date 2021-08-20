import React from "react"

interface MyComponentProps {
  bar: string;
  foo?: unknown;
}

export class MyComponent extends React.Component<MyComponentProps> {
  static propTypes = {
    foo() {}
  }

  render() {
    return <span />
  }
}
