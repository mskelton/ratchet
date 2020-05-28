import React from "react"

type ComponentAProps = {
  a: string,
  b?: unknown
};

export function ComponentA(props: ComponentAProps) {
  return <span />
}

type ComponentBProps = {
  c?: number,
  d?: unknown
};

export function ComponentB(props: ComponentBProps) {
  return <span />
}
