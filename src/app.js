import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import themeManager from './utils/theme'
// 全局样式
import './app.scss'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    // 初始化主题系统
    themeManager.init()
  }, [])

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
