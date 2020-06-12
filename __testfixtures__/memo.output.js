import React from 'react'

type Props = {
  a?: number
}

const MyComponent = React.memo(function MyComponent(props: Props) {
  return null
})
