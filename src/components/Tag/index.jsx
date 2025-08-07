import React from 'react'
import { View } from '@tarojs/components'

function Tag({ 
  children, 
  type = 'default',
  size = 'medium',
  className = '',
  ...props 
}) {
  const typeClasses = {
    default: 'bg-theme-bg-dark text-theme-text border-theme-border',
    primary: 'bg-theme-info-bg text-theme-accent border-theme-accent-light',
    success: 'bg-theme-success-bg text-theme-success border-theme-success',
    warning: 'bg-theme-warning-bg text-theme-warning border-theme-warning',
    danger: 'bg-theme-error-bg text-theme-error border-theme-error',
    info: 'bg-theme-info-bg text-theme-info border-theme-info'
  }

  const sizeClasses = {
    small: 'px-6 py-2 text-10 h-18',
    medium: 'px-8 py-4 text-12 h-22',
    large: 'px-12 py-6 text-14 h-28'
  }

  return (
    <View 
      className={`inline-flex items-center justify-center rounded-4 font-normal whitespace-nowrap border ${typeClasses[type]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </View>
  )
}

export default Tag