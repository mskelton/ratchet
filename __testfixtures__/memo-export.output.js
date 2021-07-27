import React from 'react'

interface Props {
  a?: number
};

export const MyComponent = React.memo(function MyComponent(props: Props) {
  return null
})
