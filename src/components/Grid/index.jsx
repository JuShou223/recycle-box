import React from 'react'
import { View } from '@tarojs/components'

function Grid({ 
  columns = 2,
  gap = 12,
  children,
  className = '',
  ...props 
}) {
  return (
    <View 
      className={`grid w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`
      }}
      {...props}
    >
      {children}
    </View>
  )
}

export default Grid