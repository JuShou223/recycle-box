import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Grid from '../../components/Grid'
import Tag from '../../components/Tag'
import Taro from '@tarojs/taro'
import './index.scss'

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
    <View className='recycle-page'>
      {/* 快速操作 */}
      <Card className='quick-ops'>
        <View className='ops-grid'>
          <Button 
            type='primary' 
            className='scan-btn'
            onClick={handleScanCode}
          >
            📱 扫码回收
          </Button>
          <Button 
            type='success'
            className='map-btn'
            onClick={handleViewMap}
          >
            📍 查看地图
          </Button>
        </View>
      </Card>

      {/* 附近回收箱 */}
      <Card className='nearby-boxes'>
        <Text className='section-title'>附近回收箱</Text>
        {nearbyBoxes.map((box) => (
          <View 
            key={box.id}
            className='box-item'
            onClick={() => handleBoxSelect(box)}
          >
            <View className='box-info'>
              <View className='box-header'>
                <Text className='box-name'>{box.name}</Text>
                <Tag 
                  type={box.status === 'available' ? 'success' : 'danger'}
                  size='small'
                >
                  {box.status === 'available' ? '可用' : '已满'}
                </Tag>
              </View>
              <Text className='box-distance'>📍 距离 {box.distance}</Text>
              <View className='box-types'>
                {box.types.map((type, index) => (
                  <Tag key={index} size='small' className='type-tag'>
                    {type}
                  </Tag>
                ))}
              </View>
              <View className='capacity-info'>
                <Text className='capacity-text'>容量: {box.capacity}%</Text>
                <View className='capacity-bar'>
                  <View 
                    className='capacity-fill'
                    style={{ width: `${box.capacity}%` }}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </Card>

      {/* 垃圾分类指引 */}
      <Card className='waste-guide'>
        <Text className='section-title'>垃圾分类指引</Text>
        <Grid columns={2} gap={12}>
          {wasteCategories.map((category, index) => (
            <View key={index} className='category-item'>
              <View className='category-header'>
                <Text className='category-icon'>{category.icon}</Text>
                <Text 
                  className='category-name'
                  style={{ color: category.color }}
                >
                  {category.type}
                </Text>
              </View>
              <Text className='category-points'>{category.points}</Text>
              <View className='category-examples'>
                {category.examples.map((example, idx) => (
                  <Text key={idx} className='example-item'>
                    {example}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </Grid>
      </Card>
    </View>
  )
}

export default Recycle