import React from "react"

interface Props {
  bar: string,
  foo?: number
};

export class MyComponent extends React.Component<Props> {
  render() {
    return <span />
  }
}
