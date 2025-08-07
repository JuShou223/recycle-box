import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

function Progress({ 
  percentage = 0,
  strokeWidth = 8,
  strokeColor = 'var(--theme-primary)',
  className = '',
  ...props 
}) {
  return (
    <View className={`custom-progress ${className}`} {...props}>
      <View 
        className="custom-progress__track"
        style={{ height: `${strokeWidth}px` }}
      >
        <View 
          className="custom-progress__bar"
          style={{ 
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            backgroundColor: strokeColor
          }}
        />
      </View>
    </View>
  )
}

export default Progress