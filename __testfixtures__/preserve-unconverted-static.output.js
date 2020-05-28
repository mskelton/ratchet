import React from "react"

type Props = {
  bar: string,
  foo?: unknown
};

export class MyComponent extends React.Component<Props> {
  static propTypes = {
    foo() {}
  }

  render() {
    return <span />
  }
}
