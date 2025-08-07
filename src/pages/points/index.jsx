import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Button from '../../components/Button'
import Tabs, { TabPane } from '../../components/Tabs'
import Progress from '../../components/Progress'
import Tag from '../../components/Tag'
import Taro from '@tarojs/taro'

function Points() {
  const [activeTab, setActiveTab] = useState('0')
  const [userPoints] = useState({
    total: 1250,
    available: 1050,
    frozen: 200,
    level: 3,
    nextLevelPoints: 1500
  })

  const [pointsHistory] = useState([
    {
      id: 1,
      type: 'earn',
      amount: 45,
      reason: '回收纸类垃圾',
      weight: '1.5kg',
      time: '2024-01-15 14:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'earn', 
      amount: 60,
      reason: '回收塑料垃圾',
      weight: '2.0kg',
      time: '2024-01-15 10:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'spend',
      amount: -100,
      reason: '兑换星巴克优惠券',
      time: '2024-01-14 16:20',
      status: 'completed'
    },
    {
      id: 4,
      type: 'earn',
      amount: 30,
      reason: '回收金属垃圾',
      weight: '0.6kg', 
      time: '2024-01-14 09:45',
      status: 'completed'
    }
  ])

  const [exchangeItems] = useState([
    {
      id: 1,
      name: '星巴克咖啡券',
      points: 200,
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 50,
      type: 'coupon'
    },
    {
      id: 2,
      name: '5元现金红包',
      points: 500,
      image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 100,
      type: 'cash'
    },
    {
      id: 3,
      name: '环保购物袋',
      points: 150,
      image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 30,
      type: 'gift'
    },
    {
      id: 4,
      name: '10元话费充值',
      points: 1000,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 20,
      type: 'recharge'
    }
  ])

  const handleExchange = (item) => {
    if (userPoints.available < item.points) {
      Taro.showToast({
        title: '积分不足',
        icon: 'error'
      })
      return
    }

    Taro.showModal({
      title: '确认兑换',
      content: `确定要用 ${item.points} 积分兑换 ${item.name} 吗？`,
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '兑换成功',
            icon: 'success'
          })
        }
      }
    })
  }

  const handleViewRanking = () => {
    Taro.navigateTo({ url: '/pages/ranking/index' })
  }

  const levelProgress = ((userPoints.total - (userPoints.level - 1) * 500) / 500) * 100

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 积分概览 */}
      <View className="m-5 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white p-5">
        <View className="flex justify-between items-start mb-5">
          <View>
            <Text className="text-4xl font-bold text-white block leading-none">{userPoints.total}</Text>
            <Text className="text-sm text-green-100">总积分</Text>
          </View>
          <View className="text-right flex-1 ml-5">
            <Text className="text-base font-bold text-white block mb-2">Lv.{userPoints.level}</Text>
            <Progress 
              percentage={levelProgress}
              strokeWidth={6}
              strokeColor='#52c41a'
              className="mb-1"
            />
            <Text className="text-xs text-green-100">
              距离Lv.{userPoints.level + 1}还需{userPoints.nextLevelPoints - userPoints.total}积分
            </Text>
          </View>
        </View>
        
        <View className="flex justify-between items-center">
          <View className="text-center">
            <Text className="text-lg font-bold text-white block mb-1">{userPoints.available}</Text>
            <Text className="text-xs text-green-100">可用积分</Text>
          </View>
          <View className="text-center">
            <Text className="text-lg font-bold text-white block mb-1">{userPoints.frozen}</Text>
            <Text className="text-xs text-green-100">冻结积分</Text>
          </View>
          <View className="text-center">
            <Button 
              size='small' 
              className="bg-white text-green-600 px-3 py-1 rounded-full text-xs font-medium"
              onClick={handleViewRanking}
            >
              查看排行
            </Button>
          </View>
        </View>
      </View>

      {/* 标签页 */}
      <View className="mx-5">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabPane title='积分记录'>
          <View>
            {pointsHistory.map((record) => (
              <View key={record.id} className="bg-white rounded-lg p-4 mb-3 flex justify-between items-center">
                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-800 block mb-1">{record.reason}</Text>
                  <Text className="text-xs text-gray-600 block mb-0.5">{record.time}</Text>
                  {record.weight && (
                    <Text className="text-xs text-gray-500">重量: {record.weight}</Text>
                  )}
                </View>
                <View className="text-right">
                  <Text 
                    className={`text-base font-bold block mb-1 ${record.type === 'earn' ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {record.type === 'earn' ? '+' : ''}{record.amount}
                  </Text>
                  <Tag 
                    type='success' 
                    size='small'
                  >
                    已完成
                  </Tag>
                </View>
              </View>
            ))}
          </View>
        </TabPane>
        
        <TabPane title='积分兑换'>
          <View className="grid grid-cols-2 gap-3">
            {exchangeItems.map((item) => (
              <View key={item.id} className="bg-white rounded-lg overflow-hidden">
                <View 
                  className="w-full h-30 bg-cover bg-center bg-gray-200"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <View className="p-3">
                  <Text className="text-xs font-bold text-gray-800 block mb-1 leading-tight">{item.name}</Text>
                  <Text className="text-sm text-green-600 font-bold block mb-0.5">{item.points}积分</Text>
                  <Text className="text-xs text-gray-600 block mb-2">库存: {item.stock}</Text>
                  <Button 
                    size='small'
                    type={userPoints.available >= item.points ? 'primary' : 'default'}
                    disabled={userPoints.available < item.points || item.stock === 0}
                    onClick={() => handleExchange(item)}
                    className="w-full h-8 text-xs"
                  >
                    {userPoints.available >= item.points ? '立即兑换' : '积分不足'}
                  </Button>
                </View>
              </View>
            ))}
          </View>
        </TabPane>
      </Tabs>
      </View>
    </View>
  )
}

export default Points