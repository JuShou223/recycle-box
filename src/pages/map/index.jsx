import React, { useState, useEffect } from 'react'
import { View, Text, Map } from '@tarojs/components'
import Button from '../../components/Button'
import Tag from '../../components/Tag'
import Taro from '@tarojs/taro'

function MapPage() {
  const [location, setLocation] = useState({
    latitude: 39.908823,
    longitude: 116.397470
  })
  
  const [recycleBoxes] = useState([
    {
      id: 'RB001',
      name: '万达广场回收点',
      latitude: 39.909823,
      longitude: 116.398470,
      distance: 120,
      status: 'available',
      types: ['纸类', '塑料', '金属'],
      capacity: 75,
      iconPath: '/assets/icons/recycle-marker.png'
    },
    {
      id: 'RB002',
      name: '社区服务中心',
      latitude: 39.907823,
      longitude: 116.395470,
      distance: 350,
      status: 'available', 
      types: ['纸类', '塑料', '金属', '厨余'],
      capacity: 45,
      iconPath: '/assets/icons/recycle-marker.png'
    },
    {
      id: 'RB003',
      name: '地铁站出口',
      latitude: 39.910823,
      longitude: 116.399470,
      distance: 680,
      status: 'full',
      types: ['纸类', '塑料'],
      capacity: 95,
      iconPath: '/assets/icons/recycle-marker-full.png'
    },
    {
      id: 'RB004',
      name: '公园东门',
      latitude: 39.906823,
      longitude: 116.400470,
      distance: 890,
      status: 'available',
      types: ['纸类', '塑料', '金属'],
      capacity: 30,
      iconPath: '/assets/icons/recycle-marker.png'
    }
  ])

  const [selectedBox, setSelectedBox] = useState(null)
  const [showBoxInfo, setShowBoxInfo] = useState(false)

  useEffect(() => {
    // 获取用户当前位置
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        setLocation({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: () => {
        Taro.showToast({
          title: '获取位置失败',
          icon: 'error'
        })
      }
    })
  }, [])

  const handleMarkerTap = (e) => {
    const markerId = e.detail.markerId
    const box = recycleBoxes.find(b => b.id === markerId)
    if (box) {
      setSelectedBox(box)
      setShowBoxInfo(true)
    }
  }

  const handleNavigate = (box) => {
    Taro.openLocation({
      latitude: box.latitude,
      longitude: box.longitude,
      name: box.name,
      address: box.name,
      scale: 18
    })
  }

  const handleUseBox = (box) => {
    if (box.status === 'full') {
      Taro.showToast({
        title: '回收箱已满',
        icon: 'error'
      })
      return
    }
    
    Taro.navigateTo({
      url: `/pages/scan/index?boxId=${box.id}`
    })
  }

  const markers = recycleBoxes.map(box => ({
    id: box.id,
    latitude: box.latitude,
    longitude: box.longitude,
    iconPath: box.iconPath,
    width: 30,
    height: 30,
    callout: {
      content: box.name,
      fontSize: 12,
      borderRadius: 4,
      bgColor: '#ffffff',
      padding: 8,
      display: 'ALWAYS'
    }
  }))

  return (
    <View className="h-screen flex flex-col">
      {/* 地图 */}
      <Map
        id='recycleMap'
        longitude={location.longitude}
        latitude={location.latitude}
        scale={15}
        markers={markers}
        onMarkerTap={handleMarkerTap}
        showLocation
        className="flex-1 w-full min-h-75"
      />

      {/* 回收箱列表 */}
      <View className="max-h-96 overflow-y-auto bg-white p-4">
        <Text className="text-base font-bold text-gray-800 block mb-3">附近回收箱 ({recycleBoxes.length}个)</Text>
        {recycleBoxes.map((box) => (
          <View key={box.id} className="bg-gray-50 rounded-lg p-3 mb-3 last:mb-0">
            <View className="flex justify-between items-start mb-2">
              <View>
                <Text className="text-sm font-bold text-gray-800 block mb-1">{box.name}</Text>
                <Text className="text-xs text-gray-600">📍 {box.distance}m</Text>
              </View>
              <Tag 
                type={box.status === 'available' ? 'success' : 'danger'}
                size='small'
              >
                {box.status === 'available' ? '可用' : '已满'}
              </Tag>
            </View>
            
            <View className="flex justify-between items-center mb-3">
              <View className="flex gap-1">
                {box.types.map((type, index) => (
                  <Text key={index} className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded">{type}</Text>
                ))}
              </View>
              <Text className="text-xs text-gray-600">容量: {box.capacity}%</Text>
            </View>
            
            <View className="flex gap-2 justify-end">
              <Button 
                size='small'
                className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                onClick={() => handleNavigate(box)}
              >
                导航
              </Button>
              <Button 
                size='small'
                className={`px-3 py-1 text-xs rounded ${box.status === 'available' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}
                disabled={box.status === 'full'}
                onClick={() => handleUseBox(box)}
              >
                {box.status === 'available' ? '使用' : '已满'}
              </Button>
            </View>
          </View>
        ))}
      </View>

      {/* 回收箱详情弹窗 */}
      {showBoxInfo && selectedBox && (
        <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowBoxInfo(false)}>
          <View className="bg-white rounded-xl p-5 mx-5 max-w-80 w-full" onClick={(e) => e.stopPropagation()}>
            <Text className="text-base font-bold text-gray-800 block mb-2">{selectedBox.name}</Text>
            <Text className="text-sm text-gray-600 block mb-3">距离: {selectedBox.distance}m</Text>
            <View className="flex items-center flex-wrap gap-1.5 mb-3">
              <Text className="text-xs text-gray-600">支持类型:</Text>
              {selectedBox.types.map((type, index) => (
                <Text key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">{type}</Text>
              ))}
            </View>
            <Text className="text-xs text-gray-600 block mb-4">
              容量: {selectedBox.capacity}% 
              {selectedBox.status === 'full' && ' (已满)'}
            </Text>
            <View className="flex gap-3 justify-center">
              <Button 
                size='small'
                className="px-4 py-2 text-xs bg-gray-100 text-gray-600 rounded"
                onClick={() => handleNavigate(selectedBox)}
              >
                导航前往
              </Button>
              <Button 
                size='small'
                className={`px-4 py-2 text-xs rounded ${selectedBox.status === 'available' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}
                disabled={selectedBox.status === 'full'}
                onClick={() => handleUseBox(selectedBox)}
              >
                立即使用
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default MapPage