import React from 'react'
import { View } from '@tarojs/components'

function Card({ children, className = '', onClick, ...props }) {
  return (
    <View 
      className={`bg-theme-bg-light rounded-12 p-16 shadow-sm mb-12 last:mb-0 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </View>
  )
}

export default Card