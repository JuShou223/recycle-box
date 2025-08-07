import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Button from '../../components/Button'
import Avatar from '../../components/Avatar'
import Cell, { CellGroup } from '../../components/Cell'
import Switch from '../../components/Switch'
import Taro from '@tarojs/taro'
import ThemeSelector from '../../components/ThemeSelector'

function Profile() {
  const [userInfo] = useState({
    nickname: '环保达人',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    phone: '138****8888',
    points: 1250,
    level: 3,
    recycleCount: 28,
    co2Saved: 15.6,
    joinDate: '2023-06-15'
  })

  const [settings, setSettings] = useState({
    notifications: true,
    locationService: true,
    autoLogin: true
  })
  
  const [showThemeSelector, setShowThemeSelector] = useState(false)

  const [myDevices] = useState([
    {
      id: 'RB001',
      name: '万达广场回收点',
      lastUsed: '2024-01-15 14:30',
      useCount: 12
    },
    {
      id: 'RB002',
      name: '社区服务中心',
      lastUsed: '2024-01-14 09:45', 
      useCount: 8
    },
    {
      id: 'RB003',
      name: '地铁站出口',
      lastUsed: '2024-01-12 16:20',
      useCount: 5
    }
  ])

  const handleEditProfile = () => {
    Taro.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }

  const handleViewMessages = () => {
    Taro.navigateTo({ url: '/pages/messages/index' })
  }

  const handleViewHistory = () => {
    Taro.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }

  const handleFeedback = () => {
    Taro.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }

  const handleAbout = () => {
    Taro.showModal({
      title: '关于我们',
      content: '智能垃圾回收小程序 v1.0.0\n让环保变得更简单',
      showCancel: false
    })
  }
  
  const handleThemeSelect = () => {
    setShowThemeSelector(true)
  }

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 用户信息卡片 */}
      <View className="m-5 rounded-2xl bg-white p-5 shadow-sm">
        <View className="flex items-center mb-5">
          <Avatar 
            size="large" 
            src={userInfo.avatar}
            className="mr-4"
          />
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800 block mb-1">{userInfo.nickname}</Text>
            <Text className="text-sm text-gray-600 block mb-0.5">{userInfo.phone}</Text>
            <Text className="text-xs text-gray-500">加入时间: {userInfo.joinDate}</Text>
          </View>
          <Button 
            size='small'
            className="bg-green-500 text-white px-3 py-1 rounded-full text-xs"
            onClick={handleEditProfile}
          >
            编辑
          </Button>
        </View>
        
        <View className="flex justify-between">
          <View className="text-center">
            <Text className="text-xl font-bold text-green-600 block mb-1">{userInfo.points}</Text>
            <Text className="text-xs text-gray-600">总积分</Text>
          </View>
          <View className="text-center">
            <Text className="text-xl font-bold text-green-600 block mb-1">{userInfo.recycleCount}</Text>
            <Text className="text-xs text-gray-600">回收次数</Text>
          </View>
          <View className="text-center">
            <Text className="text-xl font-bold text-green-600 block mb-1">{userInfo.co2Saved}kg</Text>
            <Text className="text-xs text-gray-600">减少碳排放</Text>
          </View>
          <View className="text-center">
            <Text className="text-xl font-bold text-green-600 block mb-1">Lv.{userInfo.level}</Text>
            <Text className="text-xs text-gray-600">当前等级</Text>
          </View>
        </View>
      </View>

      {/* 我的设备 */}
      <View className="mx-5 mb-5 bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-base font-bold text-gray-800 block mb-4">我的设备</Text>
        {myDevices.map((device) => (
          <View key={device.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-800 block mb-1">{device.name}</Text>
              <Text className="text-xs text-gray-600 block mb-0.5">设备ID: {device.id}</Text>
              <Text className="text-xs text-gray-500">
                使用{device.useCount}次 · 最近使用: {device.lastUsed}
              </Text>
            </View>
            <Text className="text-lg text-gray-400">›</Text>
          </View>
        ))}
      </View>

      {/* 功能菜单 */}
      <View className="mx-5 mb-5 bg-white rounded-xl overflow-hidden shadow-sm">
        <Cell 
          title='消息通知'
          onClick={handleViewMessages}
          extra='›'
        />
        <Cell 
          title='回收记录'
          onClick={handleViewHistory}
          extra='›'
        />
        <Cell 
          title='意见反馈'
          onClick={handleFeedback}
          extra='›'
        />
        <Cell 
          title='关于我们'
          onClick={handleAbout}
          extra='›'
        />
        <Cell 
          title='主题设置'
          onClick={handleThemeSelect}
          extra='›'
        />
      </View>

      {/* 设置选项 */}
      <View className="mx-5 bg-white rounded-xl overflow-hidden shadow-sm">
        <Cell 
          title='消息推送'
          extra={
            <Switch 
              checked={settings.notifications}
              onChange={(value) => handleSettingChange('notifications', value)}
            />
          }
        />
        <Cell 
          title='位置服务'
          extra={
            <Switch 
              checked={settings.locationService}
              onChange={(value) => handleSettingChange('locationService', value)}
            />
          }
        />
        <Cell 
          title='自动登录'
          extra={
            <Switch 
              checked={settings.autoLogin}
              onChange={(value) => handleSettingChange('autoLogin', value)}
            />
          }
        />
      </View>
      
      {/* 主题选择器 */}
      <ThemeSelector 
        visible={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
      />
    </View>
  )
}

export default Profile