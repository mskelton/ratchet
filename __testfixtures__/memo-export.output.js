import React from 'react'

interface MyComponentProps {
  a?: number
}

export const MyComponent = React.memo(function MyComponent(props: MyComponentProps) {
  return null
})
