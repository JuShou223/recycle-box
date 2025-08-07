import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Button from '../Button'

function Empty({ 
  image,
  imageSize = 'medium',
  title = '暂无数据',
  description,
  actionText,
  onAction,
  className = '',
  ...props 
}) {
  const getDefaultImage = () => {
    // 使用emoji作为默认图标
    return '📭'
  }

  const sizeClasses = {
    small: {
      container: 'p-40 min-h-200',
      content: 'max-w-300',
      image: 'mb-12',
      icon: 'text-48',
      img: 'w-80 h-80',
      title: 'text-14 mb-6',
      description: 'text-12 mb-16',
      action: 'mt-8'
    },
    medium: {
      container: 'p-40 min-h-200',
      content: 'max-w-300',
      image: 'mb-16',
      icon: 'text-64',
      img: 'w-120 h-120',
      title: 'text-16 mb-8',
      description: 'text-14 mb-20',
      action: 'mt-8'
    },
    large: {
      container: 'p-40 min-h-200',
      content: 'max-w-300',
      image: 'mb-20',
      icon: 'text-80',
      img: 'w-160 h-160',
      title: 'text-18 mb-12',
      description: 'text-16 mb-24',
      action: 'mt-8'
    }
  }

  const currentSize = sizeClasses[imageSize]
  return (
    <View className={`flex items-center justify-center ${currentSize.container} ${className}`} {...props}>
      <View className={`flex flex-col items-center justify-center text-center ${currentSize.content}`}>
        {/* 空状态图片 */}
        <View className={`flex items-center justify-center ${currentSize.image}`}>
          {image ? (
            typeof image === 'string' && image.startsWith('http') ? (
              <Image 
                src={image} 
                className={`rounded-8 ${currentSize.img}`}
                style={{ opacity: 0.6 }}
                mode="aspectFit"
              />
            ) : (
              <Text className={`leading-none ${currentSize.icon}`} style={{ opacity: 0.6 }}>{image}</Text>
            )
          ) : (
            <Text className={`leading-none ${currentSize.icon}`} style={{ opacity: 0.6 }}>{getDefaultImage()}</Text>
          )}
        </View>
        
        {/* 标题 */}
        {title && (
          <Text className={`text-gray-800 font-medium ${currentSize.title}`}>{title}</Text>
        )}
        
        {/* 描述 */}
        {description && (
          <Text className={`text-gray-600 ${currentSize.description}`}>{description}</Text>
        )}
        
        {/* 操作按钮 */}
        {actionText && onAction && (
          <Button 
            type="primary" 
            size="medium"
            onClick={onAction}
            className={currentSize.action}
          >
            {actionText}
          </Button>
        )}
      </View>
    </View>
  )
}

// 预设的空状态组件
function NoData({ title = '暂无数据', description, onRefresh, ...props }) {
  return (
    <Empty
      image="📊"
      title={title}
      description={description}
      actionText={onRefresh ? '刷新' : undefined}
      onAction={onRefresh}
      {...props}
    />
  )
}

function NoNetwork({ onRetry, ...props }) {
  return (
    <Empty
      image="📡"
      title="网络连接失败"
      description="请检查网络连接后重试"
      actionText="重试"
      onAction={onRetry}
      {...props}
    />
  )
}

function NoSearch({ keyword, onClear, ...props }) {
  return (
    <Empty
      image="🔍"
      title="未找到相关内容"
      description={keyword ? `没有找到"${keyword}"相关的内容` : '请尝试其他关键词'}
      actionText={onClear ? '清空搜索' : undefined}
      onAction={onClear}
      {...props}
    />
  )
}

function NoRecycleBox({ onRefresh, ...props }) {
  return (
    <Empty
      image="♻️"
      title="附近暂无回收箱"
      description="当前位置附近没有可用的回收箱"
      actionText="刷新位置"
      onAction={onRefresh}
      {...props}
    />
  )
}

function NoPoints({ onEarn, ...props }) {
  return (
    <Empty
      image="💰"
      title="暂无积分记录"
      description="快去投递垃圾赚取积分吧"
      actionText="去回收"
      onAction={onEarn}
      {...props}
    />
  )
}

function NoMessages({ ...props }) {
  return (
    <Empty
      image="📮"
      title="暂无消息"
      description="您还没有收到任何消息"
      {...props}
    />
  )
}

function NoExchange({ onBrowse, ...props }) {
  return (
    <Empty
      image="🎁"
      title="暂无兑换记录"
      description="快去积分商城兑换好礼吧"
      actionText="去兑换"
      onAction={onBrowse}
      {...props}
    />
  )
}

// 导出预设组件
Empty.NoData = NoData
Empty.NoNetwork = NoNetwork
Empty.NoSearch = NoSearch
Empty.NoRecycleBox = NoRecycleBox
Empty.NoPoints = NoPoints
Empty.NoMessages = NoMessages
Empty.NoExchange = NoExchange

export default Empty
export { 
  NoData, 
  NoNetwork, 
  NoSearch, 
  NoRecycleBox, 
  NoPoints, 
  NoMessages, 
  NoExchange 
}