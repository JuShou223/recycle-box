import Taro from '@tarojs/taro'
import { themes, defaultTheme } from '../styles/themes'
import Storage from './storage'
import Platform from './platform'

/**
 * 跨平台主题管理工具
 */
class ThemeManager {
  constructor() {
    this.currentTheme = Storage.getTheme() || defaultTheme
    this.themeColors = themes[this.currentTheme]
    this.isH5 = Platform.isH5()
  }

  /**
   * 获取当前主题
   */
  getCurrentTheme() {
    return this.currentTheme
  }

  /**
   * 设置主题
   */
  setTheme(themeName) {
    if (themes[themeName]) {
      this.currentTheme = themeName
      this.themeColors = themes[themeName]
      Storage.setTheme(themeName)
      
      if (this.isH5) {
        // H5环境：设置CSS变量
        this.applyCSSVariables()
      } else {
        // 小程序环境：触发事件通知
        this.notifyThemeChange()
      }
      return true
    }
    return false
  }

  /**
   * H5环境应用CSS变量
   */
  applyCSSVariables() {
    if (typeof document !== 'undefined' && document.documentElement) {
      const root = document.documentElement
      Object.keys(this.themeColors).forEach(key => {
        if (key !== 'name') {
          root.style.setProperty(`--theme-${key}`, this.themeColors[key])
        }
      })
    }
  }

  /**
   * 获取主题颜色
   */
  getThemeColor(colorName) {
    return this.themeColors[colorName] || this.themeColors.primary
  }

  /**
   * 获取所有主题颜色
   */
  getThemeColors() {
    return { ...this.themeColors }
  }

  /**
   * 通知主题变更
   */
  notifyThemeChange() {
    if (typeof Taro !== 'undefined' && Taro.eventCenter) {
      // 发送全局事件通知主题变更
      Taro.eventCenter.trigger('themeChange', {
        theme: this.currentTheme,
        colors: this.themeColors
      })
    }
  }

  /**
   * 监听主题变更
   */
  onThemeChange(callback) {
    if (typeof Taro !== 'undefined' && Taro.eventCenter) {
      Taro.eventCenter.on('themeChange', callback)
    }
  }

  /**
   * 移除主题变更监听
   */
  offThemeChange(callback) {
    if (typeof Taro !== 'undefined' && Taro.eventCenter) {
      Taro.eventCenter.off('themeChange', callback)
    }
  }

  /**
   * 生成主题样式对象
   */
  getThemeStyles() {
    return {
      primary: { backgroundColor: this.themeColors.primary },
      primaryText: { color: this.themeColors.primary },
      secondary: { backgroundColor: this.themeColors.secondary },
      secondaryText: { color: this.themeColors.secondary },
      accent: { backgroundColor: this.themeColors.accent },
      accentText: { color: this.themeColors.accent },
      success: { backgroundColor: this.themeColors.success },
      successText: { color: this.themeColors.success },
      warning: { backgroundColor: this.themeColors.warning },
      warningText: { color: this.themeColors.warning },
      error: { backgroundColor: this.themeColors.error },
      errorText: { color: this.themeColors.error },
      text: { color: this.themeColors.text },
      textSecondary: { color: this.themeColors.textSecondary },
      textTertiary: { color: this.themeColors.textTertiary },
      textLight: { color: this.themeColors.textLight },
      background: { backgroundColor: this.themeColors.background },
      backgroundLight: { backgroundColor: this.themeColors.backgroundLight },
      backgroundDark: { backgroundColor: this.themeColors.backgroundDark },
      border: { borderColor: this.themeColors.border },
      borderLight: { borderColor: this.themeColors.borderLight }
    }
  }

  /**
   * 初始化主题（在应用启动时调用）
   */
  init() {
    if (this.isH5) {
      this.applyCSSVariables()
    }
  }
}

// 创建全局主题管理器实例
const themeManager = new ThemeManager()

export default themeManager
export { ThemeManager }