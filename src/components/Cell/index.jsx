import React from 'react'
import { View } from '@tarojs/components'

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
      className={`flex items-center p-16 border-b border-gray-100 ${className}`}
      onClick={onClick}
      {...props}
    >
      <View className="flex-1">
        <View className="text-14 text-gray-800 font-medium">
          {title}
        </View>
        {children && (
          <View className="mt-4 text-12 text-gray-600">
            {children}
          </View>
        )}
      </View>
      {extra && (
        <View className="ml-12 text-14 text-gray-600 flex items-center">
          {extra}
        </View>
      )}
    </View>
  )
}

function CellGroup({ children, className = '', ...props }) {
  return (
    <View className={`bg-white rounded-12 overflow-hidden mb-12 ${className}`} {...props}>
      {children}
    </View>
  )
}

Cell.Group = CellGroup

export default Cell
export { CellGroup }