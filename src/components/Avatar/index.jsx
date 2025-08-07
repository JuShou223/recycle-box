import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

function Avatar({ 
  src, 
  size = 'medium',
  className = '',
  ...props 
}) {
  return (
    <View className={`custom-avatar custom-avatar--${size} ${className}`} {...props}>
      {src ? (
        <Image 
          src={src} 
          className="custom-avatar__image"
          mode="aspectFill"
        />
      ) : (
        <View className="custom-avatar__placeholder">
          👤
        </View>
      )}
    </View>
  )
}

export default Avatar