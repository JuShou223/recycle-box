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
    <View className="min-h-screen bg-gray-50 p-5">
      {/* 快速操作 */}
      <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
        <View className="flex gap-3">
          <Button 
            type='primary' 
            className="flex-1 h-12 rounded-3xl font-bold"
            onClick={handleScanCode}
          >
            📱 扫码回收
          </Button>
          <Button 
            type='success'
            className="flex-1 h-12 rounded-3xl font-bold"
            onClick={handleViewMap}
          >
            📍 查看地图
          </Button>
        </View>
      </View>

      {/* 附近回收箱 */}
      <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
        <Text className="text-base font-bold text-gray-800 block mb-4">附近回收箱</Text>
        {nearbyBoxes.map((box) => (
          <View 
            key={box.id}
            className="bg-gray-50 rounded-lg p-4 mb-3 last:mb-0 active:scale-98 transition-transform"
            onClick={() => handleBoxSelect(box)}
          >
            <View>
              <View className="flex justify-between items-center mb-2">
                <Text className="text-sm font-bold text-gray-800">{box.name}</Text>
                <Tag 
                  type={box.status === 'available' ? 'success' : 'danger'}
                  size='small'
                >
                  {box.status === 'available' ? '可用' : '已满'}
                </Tag>
              </View>
              <Text className="text-xs text-gray-600 block mb-2">📍 距离 {box.distance}</Text>
              <View className="flex gap-1 mb-2">
                {box.types.map((type, index) => (
                  <Text key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                    {type}
                  </Text>
                ))}
              </View>
              <View className="flex items-center gap-2">
                <Text className="text-xs text-gray-600 min-w-16">容量: {box.capacity}%</Text>
                <View className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-300"
                    style={{ width: `${box.capacity}%` }}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 垃圾分类指引 */}
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-base font-bold text-gray-800 block mb-4">垃圾分类指引</Text>
        <View className="grid grid-cols-2 gap-3">
          {wasteCategories.map((category, index) => (
            <View key={index} className="bg-white border border-gray-200 rounded-lg p-3">
              <View className="flex items-center mb-2">
                <Text className="text-xl mr-2">{category.icon}</Text>
                <Text 
                  className="text-sm font-bold"
                  style={{ color: category.color }}
                >
                  {category.type}
                </Text>
              </View>
              <Text className="text-xs text-green-600 font-bold block mb-2">{category.points}</Text>
              <View>
                {category.examples.map((example, idx) => (
                  <Text key={idx} className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded mr-1 mb-1 inline-block">
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