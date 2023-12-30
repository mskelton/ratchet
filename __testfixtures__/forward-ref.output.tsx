import React from "react"

interface MyComponentProps {
  bar: string
  foo?: number
}

const MyComponent = React.forwardRef<HTMLElement, MyComponentProps>((props, ref) => {
  return <span ref={ref} />
})

export default MyComponent
