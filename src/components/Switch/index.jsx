import React from 'react'
import { View } from '@tarojs/components'
import { useTheme } from '../../hooks/useTheme'

function Switch({ 
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props 
}) {
  const { themeColors } = useTheme()
  
  const handleClick = () => {
    if (disabled) return
    onChange && onChange(!checked)
  }

  const switchStyle = checked 
    ? { backgroundColor: themeColors.primary, borderColor: themeColors.primary }
    : { backgroundColor: '#f5f5f5', borderColor: '#d9d9d9' }

  return (
    <View 
      className={`relative w-44 h-24 rounded-12 border ${disabled ? '' : ''} ${className}`}
      style={{
        ...switchStyle,
        opacity: disabled ? 0.5 : 1
      }}
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