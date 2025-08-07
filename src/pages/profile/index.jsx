import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Card, Button, Avatar, Cell, CellGroup, Switch } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

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

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <View className='profile-page'>
      {/* 用户信息卡片 */}
      <Card className='user-info-card'>
        <View className='user-header'>
          <Avatar 
            size="large" 
            src={userInfo.avatar}
            className='user-avatar'
          />
          <View className='user-details'>
            <Text className='username'>{userInfo.nickname}</Text>
            <Text className='user-phone'>{userInfo.phone}</Text>
            <Text className='join-date'>加入时间: {userInfo.joinDate}</Text>
          </View>
          <Button 
            size='small'
            type='primary'
            onClick={handleEditProfile}
          >
            编辑
          </Button>
        </View>
        
        <View className='user-stats'>
          <View className='stat-item'>
            <Text className='stat-number'>{userInfo.points}</Text>
            <Text className='stat-label'>总积分</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>{userInfo.recycleCount}</Text>
            <Text className='stat-label'>回收次数</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>{userInfo.co2Saved}kg</Text>
            <Text className='stat-label'>减少碳排放</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>Lv.{userInfo.level}</Text>
            <Text className='stat-label'>当前等级</Text>
          </View>
        </View>
      </Card>

      {/* 我的设备 */}
      <Card className='my-devices'>
        <Text className='section-title'>我的设备</Text>
        {myDevices.map((device) => (
          <View key={device.id} className='device-item'>
            <View className='device-info'>
              <Text className='device-name'>{device.name}</Text>
              <Text className='device-id'>设备ID: {device.id}</Text>
              <Text className='device-stats'>
                使用{device.useCount}次 · 最近使用: {device.lastUsed}
              </Text>
            </View>
            <Text className='device-arrow'>›</Text>
          </View>
        ))}
      </Card>

      {/* 功能菜单 */}
      <CellGroup className='menu-group'>
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
      </CellGroup>

      {/* 设置选项 */}
      <CellGroup className='settings-group'>
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
      </CellGroup>
    </View>
  )
}

export default Profile