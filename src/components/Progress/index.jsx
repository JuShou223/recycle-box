import React from 'react'
import { View } from '@tarojs/components'

function Progress({ 
  percentage = 0,
  strokeWidth = 8,
  strokeColor = 'var(--theme-primary)',
  className = '',
  ...props 
}) {
  return (
    <View className={`w-full ${className}`} {...props}>
      <View 
        className="bg-theme-bg-dark rounded-4 overflow-hidden relative"
        style={{ height: `${strokeWidth}px` }}
      >
        <View 
          className="h-full rounded-4 transition-all"
          style={{ 
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            backgroundColor: strokeColor
            transitionDuration: '0.3s',
            transitionTimingFunction: 'ease'
          }}
        />
      </View>
    </View>
  )
}

export default Progress