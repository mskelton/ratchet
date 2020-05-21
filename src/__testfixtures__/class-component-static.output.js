import React from "react"

type Props = {
  bar: string,
  foo?: number
};

export class MyComponent extends React.Component<Props> {
  render() {
    return <span />
  }
}
