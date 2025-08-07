import React from 'react'
import { View } from '@tarojs/components'

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

  const baseClasses = 'inline-flex items-center justify-center rounded-6 font-medium transition-all cursor-pointer select-none text-center'
  
  const typeClasses = {
    default: 'bg-theme-bg-light text-theme-text border border-theme-border hover:border-theme-primary hover:text-theme-primary',
    primary: 'bg-theme-primary text-theme-text-light border border-theme-primary hover:bg-theme-primary-light hover:border-theme-primary-light',
    success: 'bg-theme-success text-theme-text-light border border-theme-success',
    warning: 'bg-theme-warning text-theme-text-light border border-theme-warning',
    danger: 'bg-theme-error text-theme-text-light border border-theme-error'
  }
  
  const sizeClasses = {
    small: 'px-12 py-4 text-12 h-28 rounded-4',
    medium: 'px-16 py-8 text-14 h-36',
    large: 'px-24 py-12 text-16 h-48 rounded-8'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''
  return (
    <View 
      className={`${baseClasses} ${typeClasses[type]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={handleClick}
      style={disabled ? { transform: 'none' } : { transform: 'scale(0.98)' }}
      {...props}
    >
      {children}
    </View>
  )
}

export default Button