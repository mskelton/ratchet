import React from "react"

interface MyComponentProps {
  a?: {
    name: number
  }[];
  b?: Record<string, number>;
}

export const MyComponent = (props: MyComponentProps) => {
  return <span />
}
