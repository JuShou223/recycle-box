import { useState, useEffect } from 'react'
import themeManager from '../utils/theme'

/**
 * 主题Hook
 */
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(themeManager.getCurrentTheme())
  const [themeColors, setThemeColors] = useState(themeManager.getThemeColors())
  const [themeStyles, setThemeStyles] = useState(themeManager.getThemeStyles())

  useEffect(() => {
    // 监听主题变更
    const handleThemeChange = ({ theme, colors }) => {
      setCurrentTheme(theme)
      setThemeColors(colors)
      setThemeStyles(themeManager.getThemeStyles())
    }

    themeManager.onThemeChange(handleThemeChange)

    return () => {
      themeManager.offThemeChange(handleThemeChange)
    }
  }, [])

  const changeTheme = (themeName) => {
    return themeManager.setTheme(themeName)
  }

  const getColor = (colorName) => {
    return themeManager.getThemeColor(colorName)
  }

  return {
    currentTheme,
    themeColors,
    themeStyles,
    changeTheme,
    getColor
  }
}