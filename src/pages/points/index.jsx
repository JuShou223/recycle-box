import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Card, Button, Tabs, TabPane, Progress, Tag } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

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
    <View className='points-page'>
      {/* 积分概览 */}
      <Card className='points-overview'>
        <View className='points-header'>
          <View className='points-main'>
            <Text className='points-number'>{userPoints.total}</Text>
            <Text className='points-label'>总积分</Text>
          </View>
          <View className='level-info'>
            <Text className='level-text'>Lv.{userPoints.level}</Text>
            <Progress 
              percentage={levelProgress}
              strokeWidth={6}
              strokeColor='#52c41a'
              className='level-progress'
            />
            <Text className='next-level'>
              距离Lv.{userPoints.level + 1}还需{userPoints.nextLevelPoints - userPoints.total}积分
            </Text>
          </View>
        </View>
        
        <View className='points-stats'>
          <View className='stat-item'>
            <Text className='stat-number'>{userPoints.available}</Text>
            <Text className='stat-label'>可用积分</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>{userPoints.frozen}</Text>
            <Text className='stat-label'>冻结积分</Text>
          </View>
          <View className='stat-item'>
            <Button 
              size='small' 
              type='primary'
              onClick={handleViewRanking}
            >
              查看排行
            </Button>
          </View>
        </View>
      </Card>

      {/* 标签页 */}
      <Tabs value={activeTab} onChange={setActiveTab} className='points-tabs'>
        <TabPane title='积分记录'>
          <View className='points-history'>
            {pointsHistory.map((record) => (
              <View key={record.id} className='history-item'>
                <View className='history-info'>
                  <Text className='history-reason'>{record.reason}</Text>
                  <Text className='history-time'>{record.time}</Text>
                  {record.weight && (
                    <Text className='history-weight'>重量: {record.weight}</Text>
                  )}
                </View>
                <View className='history-points'>
                  <Text 
                    className={`points-change ${record.type === 'earn' ? 'earn' : 'spend'}`}
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
          <View className='exchange-grid'>
            {exchangeItems.map((item) => (
              <View key={item.id} className='exchange-item'>
                <View 
                  className='item-image'
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <View className='item-info'>
                  <Text className='item-name'>{item.name}</Text>
                  <Text className='item-points'>{item.points}积分</Text>
                  <Text className='item-stock'>库存: {item.stock}</Text>
                  <Button 
                    size='small'
                    type={userPoints.available >= item.points ? 'primary' : 'default'}
                    disabled={userPoints.available < item.points || item.stock === 0}
                    onClick={() => handleExchange(item)}
                    className='exchange-btn'
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
  )
}

export default Points