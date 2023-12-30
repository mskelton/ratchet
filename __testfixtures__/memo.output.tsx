import React from 'react'

interface MyComponentProps {
  a?: number
}

const MyComponent = React.memo(function MyComponent(props: MyComponentProps) {
  return null
})
