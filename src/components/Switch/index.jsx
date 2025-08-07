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
      className={`relative w-44 h-24 rounded-12 cursor-pointer transition-all border ${
        checked 
          ? 'bg-theme-primary border-theme-primary' 
          : 'bg-theme-bg-dark border-theme-border'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <View 
        className="absolute top-2 w-18 h-18 bg-theme-bg-light rounded-full transition-all shadow-sm"
        style={{
          left: checked ? '22px' : '2px',
          transitionDuration: '0.3s',
          transitionTimingFunction: 'ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
        }}
      />
    </View>
  )
}

export default Switch