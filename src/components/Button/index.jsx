import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

function Button({ 
  children, 
  type = 'default', 
  size = 'medium',
  disabled = false,
  className = '',
  onClick,
  ...props 
}) {
  const handleClick = (e) => {
    if (disabled) return
    onClick && onClick(e)
  }

  return (
    <View 
      className={`custom-button custom-button--${type} custom-button--${size} ${disabled ? 'custom-button--disabled' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </View>
  )
}

export default Button