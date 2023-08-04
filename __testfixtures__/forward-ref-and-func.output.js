import React, { forwardRef } from "react"

interface MyComponentProps {
  bar: string
  foo?: number
}

export const MyComponent = forwardRef<HTMLElement, MyComponentProps>((props, ref) => {
  return <span ref={ref} />
})

interface ComponentAProps {
  a: string
  b?: number
}

export function ComponentA(props: ComponentAProps) {
  return <span />
}
