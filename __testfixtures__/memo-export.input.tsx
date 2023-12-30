import PropTypes from 'prop-types'
import React from 'react'

export const MyComponent = React.memo(function MyComponent(props) {
  return null
})

MyComponent.propTypes = {
  a: PropTypes.number
}
