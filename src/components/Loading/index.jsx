import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

function Loading({ 
  visible = true,
  text = '加载中...',
  size = 'medium',
  type = 'spinner',
  className = '',
  ...props 
}) {
  if (!visible) return null

  return (
    <View className={`loading-container ${className}`} {...props}>
      <View className={`loading-content loading-content--${size}`}>
        {type === 'spinner' && (
          <View className="loading-spinner">
            <View className="spinner-ring" />
            <View className="spinner-ring" />
            <View className="spinner-ring" />
          </View>
        )}
        
        {type === 'dots' && (
          <View className="loading-dots">
            <View className="dot" />
            <View className="dot" />
            <View className="dot" />
          </View>
        )}
        
        {type === 'pulse' && (
          <View className="loading-pulse">
            <View className="pulse-circle" />
          </View>
        )}
        
        {text && (
          <Text className="loading-text">{text}</Text>
        )}
      </View>
    </View>
  )
}

// 页面级加载组件
function PageLoading({ text = '页面加载中...', ...props }) {
  return (
    <View className="page-loading">
      <Loading text={text} {...props} />
    </View>
  )
}

// 内容加载组件
function ContentLoading({ text = '内容加载中...', ...props }) {
  return (
    <View className="content-loading">
      <Loading size="small" text={text} {...props} />
    </View>
  )
}

Loading.Page = PageLoading
Loading.Content = ContentLoading

export default Loading
export { PageLoading, ContentLoading }