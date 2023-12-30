import React from "react"

interface ComponentAProps {
  a: string
  b?: number
}

export function ComponentA(props: ComponentAProps) {
  return <span />
}

interface ComponentBProps {
  c?: unknown[]
  d: object
}

export function ComponentB(props: ComponentBProps) {
  return <span />
}
