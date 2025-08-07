import { useState, useEffect } from 'react'
import themeManager from '../utils/theme'
import Platform from '../utils/platform'

/**
 * 跨平台主题Hook
 */
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(themeManager.getCurrentTheme())
  const [themeColors, setThemeColors] = useState(themeManager.getThemeColors())
  const [themeStyles, setThemeStyles] = useState(themeManager.getThemeStyles())
  const isH5 = Platform.isH5()

  useEffect(() => {
    // 初始化主题
    themeManager.init()

    // 小程序环境监听主题变更事件
    const handleThemeChange = ({ theme, colors }) => {
      setCurrentTheme(theme)
      setThemeColors(colors)
      setThemeStyles(themeManager.getThemeStyles())
    }

    if (!isH5) {
      // 只在小程序环境监听事件
      themeManager.onThemeChange(handleThemeChange)
    }

    return () => {
      if (!isH5) {
        themeManager.offThemeChange(handleThemeChange)
      }
    }
  }, [isH5])

  const changeTheme = (themeName) => {
    const success = themeManager.setTheme(themeName)
    
    if (success && isH5) {
      // H5环境需要手动更新状态
      setCurrentTheme(themeName)
      setThemeColors(themeManager.getThemeColors())
      setThemeStyles(themeManager.getThemeStyles())
    }
    
    return success
  }

  const getColor = (colorName) => {
    return themeManager.getThemeColor(colorName)
  }

  return {
    currentTheme,
    themeColors,
    themeStyles,
    changeTheme,
    getColor,
    isH5
  }
}