import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { applyTheme, getCurrentTheme } from './styles/themes'
// 全局样式
import './app.scss'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    // 应用保存的主题
    applyTheme(getCurrentTheme())
  }, [])

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
