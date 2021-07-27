import React from "react"

interface ComponentAProps {
  a: string,
  b?: unknown
};

export function ComponentA(props: ComponentAProps) {
  return <span />
}

interface ComponentBProps {
  c?: number,
  d?: unknown
};

export function ComponentB(props: ComponentBProps) {
  return <span />
}
