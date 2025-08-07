import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

function Tag({ 
  children, 
  type = 'default',
  size = 'medium',
  className = '',
  ...props 
}) {
  return (
    <View 
      className={`custom-tag custom-tag--${type} custom-tag--${size} ${className}`}
      {...props}
    >
      {children}
    </View>
  )
}

export default Tag