import React from 'react'
import { View } from '@tarojs/components'
import { useTheme } from '../../hooks/useTheme'

function Button({ 
  children, 
  type = 'default', 
  size = 'medium',
  disabled = false,
  className = '',
  onClick,
  ...props 
}) {
  const { themeStyles } = useTheme()

  const handleClick = (e) => {
    if (disabled) return
    onClick && onClick(e)
  }

  const baseClasses = 'inline-flex items-center justify-center rounded-6 font-medium text-center'
  
  const getTypeStyle = (type) => {
    switch (type) {
      case 'primary':
        return { ...themeStyles.primary, color: '#ffffff' }
      case 'success':
        return { ...themeStyles.success, color: '#ffffff' }
      case 'warning':
        return { ...themeStyles.warning, color: '#ffffff' }
      case 'danger':
        return { ...themeStyles.error, color: '#ffffff' }
      default:
        return { backgroundColor: '#ffffff', color: '#333333', borderColor: '#d9d9d9' }
    }
  }
  
  const sizeClasses = {
    small: 'px-12 py-4 text-12 h-28 rounded-4',
    medium: 'px-16 py-8 text-14 h-36',
    large: 'px-24 py-12 text-16 h-48 rounded-8'
  }
  
  const typeStyle = getTypeStyle(type)
  const disabledStyle = disabled ? { opacity: 0.5 } : {}
  
  return (
    <View 
      className={`${baseClasses} ${sizeClasses[size]} border ${className}`}
      style={{ ...typeStyle, ...disabledStyle }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </View>
  )
}

export default Button