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
    default: 'bg-gray-100 text-gray-800 border-gray-300',
    primary: 'bg-blue-100 text-blue-600 border-blue-300',
    success: 'bg-green-100 text-green-600 border-green-300',
    warning: 'bg-yellow-100 text-yellow-600 border-yellow-300',
    danger: 'bg-red-100 text-red-600 border-red-300',
    info: 'bg-blue-100 text-blue-600 border-blue-300'
  }

  const sizeClasses = {
    small: 'px-6 py-2 text-12 h-18',
    medium: 'px-8 py-4 text-12 h-22',
    large: 'px-12 py-6 text-14 h-28'
  }

  return (
    <View 
      className={`inline-flex items-center justify-center rounded-4 font-normal border ${typeClasses[type]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </View>
  )
}

export default Tag