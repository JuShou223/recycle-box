import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

function Cell({ 
  title,
  extra,
  onClick,
  className = '',
  children,
  ...props 
}) {
  return (
    <View 
      className={`custom-cell ${onClick ? 'custom-cell--clickable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      <View className="custom-cell__content">
        <View className="custom-cell__title">
          {title}
        </View>
        {children && (
          <View className="custom-cell__body">
            {children}
          </View>
        )}
      </View>
      {extra && (
        <View className="custom-cell__extra">
          {extra}
        </View>
      )}
    </View>
  )
}

function CellGroup({ children, className = '', ...props }) {
  return (
    <View className={`custom-cell-group ${className}`} {...props}>
      {children}
    </View>
  )
}

Cell.Group = CellGroup

export default Cell
export { CellGroup }