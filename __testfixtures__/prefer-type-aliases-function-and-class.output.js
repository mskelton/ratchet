import React from "react"

type ComponentAProps = {
  a: string
  b?: number
};

export function ComponentA(props: ComponentAProps) {
  return <span />
}

type ComponentBProps = {
  c?: unknown[]
  d: object
};

export class ComponentB extends React.Component<ComponentBProps> {
  render() {
    return <span />
  }
}
