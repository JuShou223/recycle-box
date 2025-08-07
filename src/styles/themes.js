// 主题颜色配置
export const themes = {
  // 默认绿色环保主题
  green: {
    name: '环保绿',
    primary: '#52c41a',
    primaryLight: '#73d13d',
    primaryDark: '#389e0d',
    secondary: '#faad14',
    secondaryLight: '#ffd666',
    secondaryDark: '#d48806',
    accent: '#1890ff',
    accentLight: '#40a9ff',
    accentDark: '#096dd9',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    // 中性色
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textLight: '#ffffff',
    background: '#f5f5f5',
    backgroundLight: '#ffffff',
    backgroundDark: '#f0f0f0',
    border: '#e8e8e8',
    borderLight: '#f0f0f0',
    // 渐变色
    gradientPrimary: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
    gradientSecondary: 'linear-gradient(135deg, #faad14 0%, #ffd666 100%)',
    gradientAccent: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
    // 功能色背景
    successBg: '#f6ffed',
    warningBg: '#fff7e6',
    errorBg: '#fff2f0',
    infoBg: '#e6f7ff'
  },

  // 蓝色科技主题
  blue: {
    name: '科技蓝',
    primary: '#1890ff',
    primaryLight: '#40a9ff',
    primaryDark: '#096dd9',
    secondary: '#722ed1',
    secondaryLight: '#9254de',
    secondaryDark: '#531dab',
    accent: '#13c2c2',
    accentLight: '#36cfc9',
    accentDark: '#08979c',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textLight: '#ffffff',
    background: '#f0f2f5',
    backgroundLight: '#ffffff',
    backgroundDark: '#e6f7ff',
    border: '#d9d9d9',
    borderLight: '#e6f7ff',
    gradientPrimary: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
    gradientSecondary: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
    gradientAccent: 'linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%)',
    successBg: '#f6ffed',
    warningBg: '#fff7e6',
    errorBg: '#fff2f0',
    infoBg: '#e6f7ff'
  },

  // 橙色活力主题
  orange: {
    name: '活力橙',
    primary: '#fa8c16',
    primaryLight: '#ffa940',
    primaryDark: '#d46b08',
    secondary: '#eb2f96',
    secondaryLight: '#f759ab',
    secondaryDark: '#c41d7f',
    accent: '#52c41a',
    accentLight: '#73d13d',
    accentDark: '#389e0d',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textLight: '#ffffff',
    background: '#fff7e6',
    backgroundLight: '#ffffff',
    backgroundDark: '#fff2e8',
    border: '#ffbb96',
    borderLight: '#ffd8bf',
    gradientPrimary: 'linear-gradient(135deg, #fa8c16 0%, #ffa940 100%)',
    gradientSecondary: 'linear-gradient(135deg, #eb2f96 0%, #f759ab 100%)',
    gradientAccent: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
    successBg: '#f6ffed',
    warningBg: '#fff7e6',
    errorBg: '#fff2f0',
    infoBg: '#e6f7ff'
  },

  // 紫色优雅主题
  purple: {
    name: '优雅紫',
    primary: '#722ed1',
    primaryLight: '#9254de',
    primaryDark: '#531dab',
    secondary: '#eb2f96',
    secondaryLight: '#f759ab',
    secondaryDark: '#c41d7f',
    accent: '#13c2c2',
    accentLight: '#36cfc9',
    accentDark: '#08979c',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textLight: '#ffffff',
    background: '#f9f0ff',
    backgroundLight: '#ffffff',
    backgroundDark: '#efdbff',
    border: '#d3adf7',
    borderLight: '#e6d7ff',
    gradientPrimary: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
    gradientSecondary: 'linear-gradient(135deg, #eb2f96 0%, #f759ab 100%)',
    gradientAccent: 'linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%)',
    successBg: '#f6ffed',
    warningBg: '#fff7e6',
    errorBg: '#fff2f0',
    infoBg: '#e6f7ff'
  }
}

// 默认主题
export const defaultTheme = 'green'

// 获取当前主题
export const getCurrentTheme = () => {
  const savedTheme = localStorage.getItem('app-theme')
  return savedTheme || defaultTheme
}

// 设置主题
export const setTheme = (themeName) => {
  if (themes[themeName]) {
    localStorage.setItem('app-theme', themeName)
    applyTheme(themeName)
    return true
  }
  return false
}

// 应用主题到CSS变量
export const applyTheme = (themeName) => {
  const theme = themes[themeName] || themes[defaultTheme]
  const root = document.documentElement
  
  // 设置CSS变量
  Object.keys(theme).forEach(key => {
    if (key !== 'name') {
      root.style.setProperty(`--theme-${key}`, theme[key])
    }
  })
}

// 获取主题颜色
export const getThemeColor = (colorName, themeName = null) => {
  const currentTheme = themeName || getCurrentTheme()
  const theme = themes[currentTheme] || themes[defaultTheme]
  return theme[colorName] || theme.primary
}