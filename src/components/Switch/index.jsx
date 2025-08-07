import React from 'react'
import { View } from '@tarojs/components'

function Switch({ 
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props 
}) {
  const handleClick = () => {
    if (disabled) return
    onChange && onChange(!checked)
  }

  return (
    <View 
      className={`relative w-44 h-24 rounded-12 border ${
        checked 
          ? 'bg-green-500 border-green-500' 
          : 'bg-gray-200 border-gray-300'
      } ${disabled ? 'opacity-50' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <View 
        className="absolute top-2 w-18 h-18 bg-white rounded-full"
        style={{
          left: checked ? '22px' : '2px',
          transition: 'left 0.3s ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
        }}
      />
    </View>
  )
}

export default Switch