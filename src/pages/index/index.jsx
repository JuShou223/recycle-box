import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button, Grid, Card, Avatar, Progress } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

function Index() {
  const [userInfo, setUserInfo] = useState({
    nickname: '环保达人',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    points: 1250,
    recycleCount: 28,
    level: 3
  })

  const [todayStats, setTodayStats] = useState({
    recycled: 3,
    points: 45,
    co2Saved: 2.3
  })

  const quickActions = [
    { 
      icon: '📱', 
      title: '扫码回收', 
      desc: '扫码开箱投递',
      path: '/pages/scan/index'
    },
    { 
      icon: '📍', 
      title: '附近回收箱', 
      desc: '查找回收点',
      path: '/pages/map/index'
    },
    { 
      icon: '🎁', 
      title: '积分兑换', 
      desc: '兑换好礼',
      path: '/pages/exchange/index'
    },
    { 
      icon: '🏆', 
      title: '排行榜', 
      desc: '环保达人榜',
      path: '/pages/ranking/index'
    }
  ]

  const handleQuickAction = (path) => {
    Taro.navigateTo({ url: path })
  }

  const handleScanCode = () => {
    Taro.scanCode({
      success: (res) => {
        console.log('扫码结果:', res.result)
        Taro.navigateTo({ 
          url: `/pages/scan/index?code=${res.result}` 
        })
      },
      fail: (err) => {
        Taro.showToast({
          title: '扫码失败',
          icon: 'error'
        })
      }
    })
  }

  return (
    <View className='index-page'>
      {/* 用户信息卡片 */}
      <Card className='user-card'>
        <View className='user-info'>
          <Avatar 
            size="large" 
            src={userInfo.avatar}
            className='user-avatar'
          />
          <View className='user-details'>
            <Text className='username'>{userInfo.nickname}</Text>
            <Text className='user-level'>Lv.{userInfo.level} 环保达人</Text>
            <View className='user-stats'>
              <Text className='stat-item'>积分: {userInfo.points}</Text>
              <Text className='stat-item'>回收: {userInfo.recycleCount}次</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* 今日数据 */}
      <Card className='today-stats'>
        <Text className='card-title'>今日环保数据</Text>
        <View className='stats-grid'>
          <View className='stat-box'>
            <Text className='stat-number'>{todayStats.recycled}</Text>
            <Text className='stat-label'>回收次数</Text>
          </View>
          <View className='stat-box'>
            <Text className='stat-number'>{todayStats.points}</Text>
            <Text className='stat-label'>获得积分</Text>
          </View>
          <View className='stat-box'>
            <Text className='stat-number'>{todayStats.co2Saved}kg</Text>
            <Text className='stat-label'>减少碳排放</Text>
          </View>
        </View>
      </Card>

      {/* 快速操作 */}
      <Card className='quick-actions'>
        <Text className='card-title'>快速操作</Text>
        <Grid columns={2} gap={16}>
          {quickActions.map((action, index) => (
            <View 
              key={index}
              className='action-item'
              onClick={() => handleQuickAction(action.path)}
            >
              <Text className='action-icon'>{action.icon}</Text>
              <Text className='action-title'>{action.title}</Text>
              <Text className='action-desc'>{action.desc}</Text>
            </View>
          ))}
        </Grid>
      </Card>

      {/* 扫码按钮 */}
      <View className='scan-button-container'>
        <Button 
          type='primary' 
          size='large'
          className='scan-button'
          onClick={handleScanCode}
        >
          📱 立即扫码回收
        </Button>
      </View>

      {/* 环保提示 */}
      <Card className='eco-tip'>
        <Text className='tip-title'>💡 环保小贴士</Text>
        <Text className='tip-content'>
          每回收1kg废纸可以减少3.3kg的CO₂排放，相当于种植0.1棵树！
        </Text>
      </Card>
    </View>
  )
}

export default Index