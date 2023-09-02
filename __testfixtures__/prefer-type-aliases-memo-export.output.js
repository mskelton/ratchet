import React from 'react'

type MyComponentProps = {
  a?: number
};

export const MyComponent = React.memo(function MyComponent(props: MyComponentProps) {
  return null
})
