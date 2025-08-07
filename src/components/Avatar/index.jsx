import React from 'react'
import { View, Image } from '@tarojs/components'

function Avatar({ 
  src, 
  size = 'medium',
  className = '',
  ...props 
}) {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48', 
    large: 'w-64 h-64'
  }

  return (
    <View 
      className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${sizeClasses[size]} ${className}`} 
      {...props}
    >
      {src ? (
        <Image 
          src={src} 
          className="w-full h-full"
          mode="aspectFill"
        />
      ) : (
        <View className="text-gray-500 text-16">
          👤
        </View>
      )}
    </View>
  )
}

export default Avatar