import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Button from '../../components/Button'
import Tag from '../../components/Tag'
import Taro from '@tarojs/taro'

function Recycle() {
  const [nearbyBoxes] = useState([
    {
      id: 'RB001',
      name: '万达广场回收点',
      distance: '120m',
      status: 'available',
      types: ['纸类', '塑料', '金属'],
      capacity: 75
    },
    {
      id: 'RB002', 
      name: '社区服务中心',
      distance: '350m',
      status: 'available',
      types: ['纸类', '塑料', '金属', '厨余'],
      capacity: 45
    },
    {
      id: 'RB003',
      name: '地铁站出口',
      distance: '680m', 
      status: 'full',
      types: ['纸类', '塑料'],
      capacity: 95
    }
  ])

  const wasteCategories = [
    {
      type: '纸类',
      icon: '📄',
      color: '#1890ff',
      examples: ['报纸', '杂志', '纸箱', '办公用纸'],
      points: '2积分/kg'
    },
    {
      type: '塑料',
      icon: '🥤',
      color: '#52c41a', 
      examples: ['塑料瓶', '塑料袋', '塑料盒', '泡沫'],
      points: '3积分/kg'
    },
    {
      type: '金属',
      icon: '🥫',
      color: '#faad14',
      examples: ['易拉罐', '金属盒', '废铁', '铜线'],
      points: '5积分/kg'
    },
    {
      type: '厨余',
      icon: '🍎',
      color: '#f5222d',
      examples: ['果皮', '菜叶', '剩饭', '茶叶渣'],
      points: '1积分/kg'
    }
  ]

  const handleScanCode = () => {
    Taro.scanCode({
      success: (res) => {
        Taro.navigateTo({ 
          url: `/pages/scan/index?code=${res.result}` 
        })
      }
    })
  }

  const handleViewMap = () => {
    Taro.navigateTo({ url: '/pages/map/index' })
  }

  const handleBoxSelect = (box) => {
    if (box.status === 'full') {
      Taro.showToast({
        title: '回收箱已满',
        icon: 'error'
      })
      return
    }
    
    Taro.showModal({
      title: '选择回收箱',
      content: `确定要使用 ${box.name} 进行回收吗？`,
      success: (res) => {
        if (res.confirm) {
          Taro.navigateTo({ 
            url: `/pages/scan/index?boxId=${box.id}` 
          })
        }
      }
    })
  }

  return (
    <View className="min-h-screen bg-gray-50 p-20">
      {/* 快速操作 */}
      <View className="bg-white rounded-12 p-16 mb-20 shadow-sm">
        <View className="flex gap-12">
          <Button 
            type='primary' 
            className="flex-1 h-48 rounded-full font-bold"
            onClick={handleScanCode}
          >
            📱 扫码回收
          </Button>
          <Button 
            type='success'
            className="flex-1 h-48 rounded-full font-bold"
            onClick={handleViewMap}
          >
            📍 查看地图
          </Button>
        </View>
      </View>

      {/* 附近回收箱 */}
      <View className="bg-white rounded-12 p-16 mb-20 shadow-sm">
        <Text className="text-16 font-bold text-gray-800 block mb-16">附近回收箱</Text>
        {nearbyBoxes.map((box) => (
          <View 
            key={box.id}
            className="bg-gray-50 rounded-8 p-16 mb-12"
            onClick={() => handleBoxSelect(box)}
          >
            <View>
              <View className="flex justify-between items-center mb-8">
                <Text className="text-14 font-bold text-gray-800">{box.name}</Text>
                <Tag 
                  type={box.status === 'available' ? 'success' : 'danger'}
                  size='small'
                >
                  {box.status === 'available' ? '可用' : '已满'}
                </Tag>
              </View>
              <Text className="text-12 text-gray-600 block mb-8">📍 距离 {box.distance}</Text>
              <View className="flex gap-4 mb-8">
                {box.types.map((type, index) => (
                  <Text key={index} className="bg-blue-100 text-blue-600 text-12 px-8 py-4 rounded-4">
                    {type}
                  </Text>
                ))}
              </View>
              <View className="flex items-center gap-8">
                <Text className="text-12 text-gray-600 min-w-64">容量: {box.capacity}%</Text>
                <View className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-green-400"
                    style={{ width: `${box.capacity}%` }}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 垃圾分类指引 */}
      <View className="bg-white rounded-12 p-16 shadow-sm">
        <Text className="text-16 font-bold text-gray-800 block mb-16">垃圾分类指引</Text>
        <View className="grid grid-cols-2 gap-12">
          {wasteCategories.map((category, index) => (
            <View key={index} className="bg-white border border-gray-200 rounded-8 p-12">
              <View className="flex items-center mb-8">
                <Text className="text-20 mr-8">{category.icon}</Text>
                <Text 
                  className="text-14 font-bold"
                  style={{ color: category.color }}
                >
                  {category.type}
                </Text>
              </View>
              <Text className="text-12 text-green-600 font-bold block mb-8">{category.points}</Text>
              <View>
                {category.examples.map((example, idx) => (
                  <Text key={idx} className="text-12 text-gray-600 bg-gray-100 px-6 py-2 rounded-4 mr-4 mb-4 inline-block">
                    {example}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Recycle