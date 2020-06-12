import React from 'react'

type Props = {
  a?: number
}

export const MyComponent = React.memo(function MyComponent(props: Props) {
  return null
})
