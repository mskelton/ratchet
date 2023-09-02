import React, { forwardRef } from "react"

type MyComponentProps = {
  bar: string
  foo?: number
};

export const MyComponent = forwardRef<HTMLElement, MyComponentProps>((props, ref) => {
  return <span ref={ref} />
})

type ComponentAProps = {
  a: string
  b?: number
};

export function ComponentA(props: ComponentAProps) {
  return <span />
}
