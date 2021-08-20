import React from "react"

interface ComponentAProps {
  a: string;
  b?: number;
}

export class ComponentA extends React.Component<ComponentAProps> {
  render() {
    return <span />
  }
}

interface ComponentBProps {
  c?: unknown[];
  d: object;
}

export class ComponentB extends React.Component<ComponentBProps> {
  render() {
    return <span />
  }
}
