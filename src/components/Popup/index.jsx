import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

function Popup({ 
  visible = false,
  position = 'bottom',
  onClose,
  children,
  className = '',
  ...props 
}) {
  if (!visible) return null

  const handleMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose()
    }
  }

  return (
    <View className={`custom-popup custom-popup--${position} ${className}`} onClick={handleMaskClick} {...props}>
      <View className="custom-popup__content">
        {children}
      </View>
    </View>
  )
}

export default Popup