import React from 'react'
import { View } from '@tarojs/components'

function Card({ children, className = '', onClick, ...props }) {
  return (
    <View 
      className={`bg-white rounded-12 p-16 mb-12 ${className}`}
      style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}
      onClick={onClick}
      {...props}
    >
      {children}
    </View>
  )
}

export default Card