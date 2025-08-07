import React from 'react'
import { View } from '@tarojs/components'

function Progress({ 
  percentage = 0,
  strokeWidth = 8,
  strokeColor = '#52c41a',
  className = '',
  ...props 
}) {
  return (
    <View className={`w-full ${className}`} {...props}>
      <View 
        className="bg-gray-200 rounded-4 overflow-hidden relative"
        style={{ height: `${strokeWidth}px` }}
      >
        <View 
          className="h-full rounded-4"
          style={{ 
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            backgroundColor: strokeColor,
            transition: 'width 0.3s ease'
          }}
        />
      </View>
    </View>
  )
}

export default Progress