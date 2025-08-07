import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Avatar from '../../components/Avatar'
import Taro from '@tarojs/taro'
import Platform from '../../utils/platform'

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
    Platform.execute({
      weapp: () => {
        // 微信小程序扫码
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
      },
      h5: () => {
        // H5环境模拟扫码或跳转到扫码页面
        Taro.showModal({
          title: '扫码功能',
          content: 'H5环境暂不支持扫码，是否直接进入扫码页面？',
          success: (res) => {
            if (res.confirm) {
              Taro.navigateTo({ 
                url: '/pages/scan/index' 
              })
            }
          }
        })
      },
      default: () => {
        Taro.navigateTo({ 
          url: '/pages/scan/index' 
        })
      }
    })
  }

  return (
    <View className={`min-h-screen bg-gray-50 p-5 ${Platform.getStyleClass()}`}>
      {/* 用户信息卡片 */}
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
        <View className="flex items-center">
          <Avatar 
            size="large" 
            src={userInfo.avatar}
            className="mr-4"
          />
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800 mb-1">{userInfo.nickname}</Text>
            <Text className="text-sm text-green-600 mb-2">Lv.{userInfo.level} 环保达人</Text>
            <View className="flex gap-4">
              <Text className="text-xs text-gray-600">积分: {userInfo.points}</Text>
              <Text className="text-xs text-gray-600">回收: {userInfo.recycleCount}次</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 今日数据 */}
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
        <Text className="text-base font-bold text-gray-800 mb-4">今日环保数据</Text>
        <View className="flex justify-around">
          <View className="text-center">
            <Text className="text-2xl font-bold text-green-600 block mb-1">{todayStats.recycled}</Text>
            <Text className="text-xs text-gray-600">回收次数</Text>
          </View>
          <View className="text-center">
            <Text className="text-2xl font-bold text-green-600 block mb-1">{todayStats.points}</Text>
            <Text className="text-xs text-gray-600">获得积分</Text>
          </View>
          <View className="text-center">
            <Text className="text-2xl font-bold text-green-600 block mb-1">{todayStats.co2Saved}kg</Text>
            <Text className="text-xs text-gray-600">减少碳排放</Text>
          </View>
        </View>
      </View>

      {/* 快速操作 */}
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
        <Text className="text-base font-bold text-gray-800 mb-4">快速操作</Text>
        <View className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <View 
              key={index}
              className="bg-gray-50 rounded-xl p-5 text-center active:scale-95 transition-transform"
              onClick={() => handleQuickAction(action.path)}
            >
              <Text className="text-3xl block mb-2">{action.icon}</Text>
              <Text className="text-sm font-bold text-gray-800 block mb-1">{action.title}</Text>
              <Text className="text-xs text-gray-600">{action.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 扫码按钮 */}
      <View className="my-5">
        <Button 
          type='primary' 
          size='large'
          className="w-full h-14 rounded-3xl text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
          onClick={handleScanCode}
        >
          📱 立即扫码回收
        </Button>
      </View>

      {/* 环保提示 */}
      <View className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border border-yellow-200">
        <Text className="text-sm font-bold text-yellow-700 block mb-2">💡 环保小贴士</Text>
        <Text className="text-xs text-gray-600 leading-relaxed">
          每回收1kg废纸可以减少3.3kg的CO₂排放，相当于种植0.1棵树！
        </Text>
      </View>
    </View>
  )
}

export default Index