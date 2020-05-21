import React from "react"

type ComponentAProps = {
  a: string,
  b?: number
};

export function ComponentA(props: ComponentAProps) {
  return <span />
}

type ComponentBProps = {
  c?: unknown[],
  d: object
};

export function ComponentB(props: ComponentBProps) {
  return <span />
}
