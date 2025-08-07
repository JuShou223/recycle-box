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
  const { themeColors, isH5 } = useTheme()

  const handleClick = (e) => {
    if (disabled) return
    onClick && onClick(e)
  }

  const baseClasses = 'inline-flex items-center justify-center font-medium text-center border'
  
  const getTypeStyle = (type) => {
    switch (type) {
      case 'primary':
        return { 
          backgroundColor: themeColors.primary,
          borderColor: themeColors.primary,
          color: '#ffffff' 
        }
      case 'success':
        return { 
          backgroundColor: themeColors.success,
          borderColor: themeColors.success,
          color: '#ffffff' 
        }
      case 'warning':
        return { 
          backgroundColor: themeColors.warning,
          borderColor: themeColors.warning,
          color: '#ffffff' 
        }
      case 'danger':
        return { 
          backgroundColor: themeColors.error,
          borderColor: themeColors.error,
          color: '#ffffff' 
        }
      default:
        return { 
          backgroundColor: '#ffffff', 
          borderColor: '#d9d9d9',
          color: '#333333' 
        }
    }
  }
  
  const sizeClasses = {
    small: 'px-12 py-4 text-12 h-28 rounded-4',
    medium: 'px-16 py-8 text-14 h-36 rounded-6',
    large: 'px-24 py-12 text-16 h-48 rounded-8'
  }
  
  const typeStyle = getTypeStyle(type)
  const disabledStyle = disabled ? { opacity: 0.5 } : {}
  
  return (
    <View 
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      style={{ ...typeStyle, ...disabledStyle }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </View>
  )
}

export default Button