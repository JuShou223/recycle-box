import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Progress from '../../components/Progress'
import Modal from '../../components/Modal'
import Taro from '@tarojs/taro'
import './index.scss'

function Scan() {
  const [scanResult, setScanResult] = useState(null)
  const [recycleBox, setRecycleBox] = useState(null)
  const [isOpening, setIsOpening] = useState(false)
  const [isWeighing, setIsWeighing] = useState(false)
  const [weight, setWeight] = useState(0)
  const [points, setPoints] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    // 获取扫码结果或回收箱ID
    const instance = Taro.getCurrentInstance()
    const { code, boxId } = instance.router.params
    
    if (code) {
      setScanResult(code)
      // 模拟解析二维码获取回收箱信息
      setRecycleBox({
        id: code,
        name: '万达广场回收点',
        location: '万达广场1楼东门',
        types: ['纸类', '塑料', '金属']
      })
    } else if (boxId) {
      setRecycleBox({
        id: boxId,
        name: '万达广场回收点',
        location: '万达广场1楼东门',
        types: ['纸类', '塑料', '金属']
      })
    }
  }, [])

  const handleOpenBox = () => {
    setIsOpening(true)
    
    // 模拟开箱过程
    setTimeout(() => {
      setIsOpening(false)
      Taro.showToast({
        title: '开箱成功',
        icon: 'success'
      })
      
      // 开始称重
      startWeighing()
    }, 2000)
  }

  const startWeighing = () => {
    setIsWeighing(true)
    
    // 模拟称重过程
    let currentWeight = 0
    const interval = setInterval(() => {
      currentWeight += Math.random() * 0.3
      setWeight(Number(currentWeight.toFixed(1)))
      
      if (currentWeight >= 2.5) {
        clearInterval(interval)
        finishWeighing(currentWeight)
      }
    }, 200)
  }

  const finishWeighing = (finalWeight) => {
    setIsWeighing(false)
    setWeight(Number(finalWeight.toFixed(1)))
    
    // 计算积分 (假设纸类2积分/kg)
    const earnedPoints = Math.floor(finalWeight * 2)
    setPoints(earnedPoints)
    
    setTimeout(() => {
      setShowResult(true)
    }, 1000)
  }

  const handleConfirmRecycle = () => {
    setShowResult(false)
    
    Taro.showToast({
      title: '回收成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  const handleScanAgain = () => {
    Taro.scanCode({
      success: (res) => {
        setScanResult(res.result)
        setRecycleBox({
          id: res.result,
          name: '万达广场回收点',
          location: '万达广场1楼东门',
          types: ['纸类', '塑料', '金属']
        })
      }
    })
  }

  if (!recycleBox) {
    return (
      <View className='scan-page'>
        <Card className='scan-prompt'>
          <Text className='prompt-title'>请扫描回收箱二维码</Text>
          <Text className='prompt-desc'>将摄像头对准回收箱上的二维码进行扫描</Text>
          <Button 
            type='primary' 
            size='large'
            onClick={handleScanAgain}
            className='scan-btn'
          >
            📱 开始扫码
          </Button>
        </Card>
      </View>
    )
  }

  return (
    <View className='scan-page'>
      {/* 回收箱信息 */}
      <Card className='box-info'>
        <Text className='box-name'>{recycleBox.name}</Text>
        <Text className='box-location'>📍 {recycleBox.location}</Text>
        <Text className='box-id'>设备ID: {recycleBox.id}</Text>
        <View className='box-types'>
          <Text className='types-label'>支持类型:</Text>
          {recycleBox.types.map((type, index) => (
            <Text key={index} className='type-tag'>{type}</Text>
          ))}
        </View>
      </Card>

      {/* 操作状态 */}
      <Card className='operation-status'>
        {!isOpening && !isWeighing && weight === 0 && (
          <View className='ready-state'>
            <Text className='status-title'>准备投递</Text>
            <Text className='status-desc'>请确认垃圾分类正确后点击开箱</Text>
            <Button 
              type='primary' 
              size='large'
              onClick={handleOpenBox}
              className='open-btn'
            >
              🔓 开箱投递
            </Button>
          </View>
        )}

        {isOpening && (
          <View className='opening-state'>
            <Text className='status-title'>正在开箱...</Text>
            <Progress 
              percentage={100}
              strokeWidth={8}
              strokeColor='#52c41a'
              animated
            />
            <Text className='status-desc'>请稍候，回收箱正在开启</Text>
          </View>
        )}

        {isWeighing && (
          <View className='weighing-state'>
            <Text className='status-title'>正在称重...</Text>
            <Text className='weight-display'>{weight} kg</Text>
            <Text className='status-desc'>请投入垃圾，系统正在自动称重</Text>
          </View>
        )}

        {!isWeighing && weight > 0 && !showResult && (
          <View className='weight-result'>
            <Text className='status-title'>称重完成</Text>
            <Text className='final-weight'>{weight} kg</Text>
            <Text className='estimated-points'>预计获得 {points} 积分</Text>
          </View>
        )}
      </Card>

      {/* 垃圾分类提示 */}
      <Card className='classification-guide'>
        <Text className='guide-title'>💡 分类提示</Text>
        <View className='guide-content'>
          <Text className='guide-item'>📄 纸类: 报纸、杂志、纸箱、办公用纸</Text>
          <Text className='guide-item'>🥤 塑料: 塑料瓶、塑料袋、塑料盒</Text>
          <Text className='guide-item'>🥫 金属: 易拉罐、金属盒、废铁</Text>
        </View>
      </Card>

      {/* 回收结果弹窗 */}
      <Modal
        visible={showResult}
        title='回收成功'
        onConfirm={handleConfirmRecycle}
        onCancel={() => setShowResult(false)}
      >
        <View className='result-content'>
          <Text className='result-weight'>重量: {weight} kg</Text>
          <Text className='result-points'>获得积分: {points} 分</Text>
          <Text className='result-thanks'>感谢您为环保做出的贡献！</Text>
        </View>
      </Modal>
    </View>
  )
}

export default Scan