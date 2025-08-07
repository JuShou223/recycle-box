import React from 'react'
import { View } from '@tarojs/components'
import { useTheme } from '../../hooks/useTheme'

function Tag({ 
  children, 
  type = 'default',
  size = 'medium',
  className = '',
  ...props 
}) {
  const { themeColors } = useTheme()

  const getTypeStyle = (type) => {
    switch (type) {
      case 'primary':
        return { 
          backgroundColor: '#e6f7ff', 
          color: themeColors.primary, 
          borderColor: themeColors.primaryLight 
        }
      case 'success':
        return { 
          backgroundColor: '#f6ffed', 
          color: themeColors.success, 
          borderColor: themeColors.success 
        }
      case 'warning':
        return { 
          backgroundColor: '#fff7e6', 
          color: themeColors.warning, 
          borderColor: themeColors.warning 
        }
      case 'danger':
        return { 
          backgroundColor: '#fff2f0', 
          color: themeColors.error, 
          borderColor: themeColors.error 
        }
      case 'info':
        return { 
          backgroundColor: '#e6f7ff', 
          color: themeColors.info, 
          borderColor: themeColors.info 
        }
      default:
        return { 
          backgroundColor: '#f5f5f5', 
          color: '#666666', 
          borderColor: '#d9d9d9' 
        }
    }
  }

  const sizeClasses = {
    small: 'px-6 py-2 text-12 h-18',
    medium: 'px-8 py-4 text-12 h-22',
    large: 'px-12 py-6 text-14 h-28'
  }

  const typeStyle = getTypeStyle(type)
  
  return (
    <View 
      className={`inline-flex items-center justify-center rounded-4 font-normal border ${sizeClasses[size]} ${className}`}
      style={typeStyle}
      {...props}
    >
      {children}
    </View>
  )
}

export default Tag