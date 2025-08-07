import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Card, Button, Tabs, TabPane, Tag } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

function Exchange() {
  const [activeTab, setActiveTab] = useState('0')
  const [userPoints] = useState(1250)

  const [coupons] = useState([
    {
      id: 1,
      name: '星巴克咖啡券',
      points: 200,
      originalPrice: 35,
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 50,
      description: '可在全国星巴克门店使用',
      validDays: 30
    },
    {
      id: 2,
      name: '麦当劳汉堡券',
      points: 150,
      originalPrice: 25,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 80,
      description: '巨无霸汉堡兑换券',
      validDays: 15
    },
    {
      id: 3,
      name: '肯德基全家桶券',
      points: 300,
      originalPrice: 89,
      image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 30,
      description: '6块鸡腿+薯条+可乐',
      validDays: 30
    }
  ])

  const [cashRewards] = useState([
    {
      id: 1,
      name: '5元现金红包',
      points: 500,
      amount: 5,
      image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 100,
      description: '微信红包，即时到账'
    },
    {
      id: 2,
      name: '10元现金红包',
      points: 1000,
      amount: 10,
      image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 50,
      description: '微信红包，即时到账'
    },
    {
      id: 3,
      name: '20元现金红包',
      points: 2000,
      amount: 20,
      image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 20,
      description: '微信红包，即时到账'
    }
  ])

  const [gifts] = useState([
    {
      id: 1,
      name: '环保购物袋',
      points: 150,
      image: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 30,
      description: '可重复使用环保袋',
      shipping: '包邮'
    },
    {
      id: 2,
      name: '竹纤维毛巾',
      points: 250,
      image: 'https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 25,
      description: '天然竹纤维制作',
      shipping: '包邮'
    },
    {
      id: 3,
      name: '保温水杯',
      points: 400,
      image: 'https://images.pexels.com/photos/1002543/pexels-photo-1002543.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 15,
      description: '304不锈钢保温杯',
      shipping: '包邮'
    }
  ])

  const [recharges] = useState([
    {
      id: 1,
      name: '10元话费充值',
      points: 1000,
      amount: 10,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 20,
      description: '支持移动/联通/电信'
    },
    {
      id: 2,
      name: '20元话费充值',
      points: 2000,
      amount: 20,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 15,
      description: '支持移动/联通/电信'
    },
    {
      id: 3,
      name: '50元话费充值',
      points: 5000,
      amount: 50,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      stock: 10,
      description: '支持移动/联通/电信'
    }
  ])

  const handleExchange = (item, type) => {
    if (userPoints < item.points) {
      Taro.showToast({
        title: '积分不足',
        icon: 'error'
      })
      return
    }

    if (item.stock === 0) {
      Taro.showToast({
        title: '库存不足',
        icon: 'error'
      })
      return
    }

    const typeNames = {
      coupon: '优惠券',
      cash: '现金红包',
      gift: '实物奖品',
      recharge: '话费充值'
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
          
          // 模拟兑换成功后的处理
          setTimeout(() => {
            if (type === 'cash') {
              Taro.showModal({
                title: '兑换成功',
                content: '现金红包将在24小时内发放到您的微信账户',
                showCancel: false
              })
            } else if (type === 'gift') {
              Taro.showModal({
                title: '兑换成功',
                content: '实物奖品将在3-7个工作日内发货，请注意查收',
                showCancel: false
              })
            } else if (type === 'recharge') {
              Taro.showModal({
                title: '兑换成功',
                content: '话费将在30分钟内充值到您的手机账户',
                showCancel: false
              })
            }
          }, 1000)
        }
      }
    })
  }

  const renderExchangeItem = (item, type) => (
    <Card key={item.id} className='exchange-item'>
      <Image 
        src={item.image}
        className='item-image'
        mode='aspectFill'
      />
      <View className='item-content'>
        <Text className='item-name'>{item.name}</Text>
        <Text className='item-description'>{item.description}</Text>
        
        <View className='item-info'>
          <View className='price-info'>
            <Text className='points-price'>{item.points}积分</Text>
            {item.originalPrice && (
              <Text className='original-price'>原价¥{item.originalPrice}</Text>
            )}
            {item.amount && (
              <Text className='amount-info'>¥{item.amount}</Text>
            )}
          </View>
          
          <View className='extra-info'>
            {item.validDays && (
              <Tag size='small' type='warning'>
                {item.validDays}天有效
              </Tag>
            )}
            {item.shipping && (
              <Tag size='small' type='success'>
                {item.shipping}
              </Tag>
            )}
            <Tag 
              size='small' 
              type={item.stock > 10 ? 'default' : 'danger'}
            >
              库存{item.stock}
            </Tag>
          </View>
        </View>
        
        <Button 
          size='small'
          type={userPoints >= item.points && item.stock > 0 ? 'primary' : 'default'}
          disabled={userPoints < item.points || item.stock === 0}
          onClick={() => handleExchange(item, type)}
          className='exchange-btn'
        >
          {userPoints >= item.points 
            ? (item.stock > 0 ? '立即兑换' : '库存不足')
            : '积分不足'
          }
        </Button>
      </View>
    </Card>
  )

  return (
    <View className='exchange-page'>
      {/* 积分余额 */}
      <Card className='points-balance'>
        <Text className='balance-label'>我的积分</Text>
        <Text className='balance-amount'>{userPoints}</Text>
        <Text className='balance-tip'>积分可兑换各种好礼</Text>
      </Card>

      {/* 兑换分类 */}
      <Tabs value={activeTab} onChange={setActiveTab} className='exchange-tabs'>
        <TabPane title='优惠券'>
          <View className='exchange-list'>
            {coupons.map(item => renderExchangeItem(item, 'coupon'))}
          </View>
        </TabPane>
        
        <TabPane title='现金红包'>
          <View className='exchange-list'>
            {cashRewards.map(item => renderExchangeItem(item, 'cash'))}
          </View>
        </TabPane>
        
        <TabPane title='实物奖品'>
          <View className='exchange-list'>
            {gifts.map(item => renderExchangeItem(item, 'gift'))}
          </View>
        </TabPane>
        
        <TabPane title='话费充值'>
          <View className='exchange-list'>
            {recharges.map(item => renderExchangeItem(item, 'recharge'))}
          </View>
        </TabPane>
      </Tabs>
    </View>
  )
}

export default Exchange