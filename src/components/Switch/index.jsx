import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

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
      className={`custom-switch ${checked ? 'custom-switch--checked' : ''} ${disabled ? 'custom-switch--disabled' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <View className="custom-switch__handle" />
    </View>
  )
}

export default Switch