import React, { useState, useEffect } from 'react'
import { View, Text, Map } from '@tarojs/components'
import { Card, Button, Tag } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

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
    <View className='map-page'>
      {/* 地图 */}
      <Map
        id='recycleMap'
        longitude={location.longitude}
        latitude={location.latitude}
        scale={15}
        markers={markers}
        onMarkerTap={handleMarkerTap}
        showLocation
        className='recycle-map'
      />

      {/* 回收箱列表 */}
      <View className='box-list'>
        <Text className='list-title'>附近回收箱 ({recycleBoxes.length}个)</Text>
        {recycleBoxes.map((box) => (
          <Card key={box.id} className='box-card'>
            <View className='box-header'>
              <View className='box-info'>
                <Text className='box-name'>{box.name}</Text>
                <Text className='box-distance'>📍 {box.distance}m</Text>
              </View>
              <Tag 
                type={box.status === 'available' ? 'success' : 'danger'}
                size='small'
              >
                {box.status === 'available' ? '可用' : '已满'}
              </Tag>
            </View>
            
            <View className='box-details'>
              <View className='box-types'>
                {box.types.map((type, index) => (
                  <Text key={index} className='type-badge'>{type}</Text>
                ))}
              </View>
              <Text className='capacity-text'>容量: {box.capacity}%</Text>
            </View>
            
            <View className='box-actions'>
              <Button 
                size='small'
                type='default'
                onClick={() => handleNavigate(box)}
              >
                导航
              </Button>
              <Button 
                size='small'
                type={box.status === 'available' ? 'primary' : 'default'}
                disabled={box.status === 'full'}
                onClick={() => handleUseBox(box)}
              >
                {box.status === 'available' ? '使用' : '已满'}
              </Button>
            </View>
          </Card>
        ))}
      </View>

      {/* 回收箱详情弹窗 */}
      {showBoxInfo && selectedBox && (
        <View className='box-info-modal' onClick={() => setShowBoxInfo(false)}>
          <View className='modal-content' onClick={(e) => e.stopPropagation()}>
            <Text className='modal-title'>{selectedBox.name}</Text>
            <Text className='modal-distance'>距离: {selectedBox.distance}m</Text>
            <View className='modal-types'>
              <Text className='types-label'>支持类型:</Text>
              {selectedBox.types.map((type, index) => (
                <Text key={index} className='type-tag'>{type}</Text>
              ))}
            </View>
            <Text className='modal-capacity'>
              容量: {selectedBox.capacity}% 
              {selectedBox.status === 'full' && ' (已满)'}
            </Text>
            <View className='modal-actions'>
              <Button 
                size='small'
                type='default'
                onClick={() => handleNavigate(selectedBox)}
              >
                导航前往
              </Button>
              <Button 
                size='small'
                type={selectedBox.status === 'available' ? 'primary' : 'default'}
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