import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

function Card({ children, className = '', onClick, ...props }) {
  return (
    <View 
      className={`custom-card ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </View>
  )
}

export default Card