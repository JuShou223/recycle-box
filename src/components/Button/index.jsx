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

  const baseClasses = 'inline-flex items-center justify-center rounded-6 font-medium text-center'
  
  const typeClasses = {
    default: 'bg-white text-gray-800 border border-gray-300',
    primary: 'bg-green-500 text-white border border-green-500',
    success: 'bg-green-500 text-white border border-green-500',
    warning: 'bg-yellow-500 text-white border border-yellow-500',
    danger: 'bg-red-500 text-white border border-red-500'
  }
  
  const sizeClasses = {
    small: 'px-12 py-4 text-12 h-28 rounded-4',
    medium: 'px-16 py-8 text-14 h-36',
    large: 'px-24 py-12 text-16 h-48 rounded-8'
  }
  
  const disabledClasses = disabled ? 'opacity-50' : ''
  
  return (
    <View 
      className={`${baseClasses} ${typeClasses[type]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </View>
  )
}

export default Button