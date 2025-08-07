import Taro from '@tarojs/taro'

/**
 * 本地存储封装
 */
class Storage {
  /**
   * 设置存储
   * @param {string} key 键名
   * @param {any} value 值
   * @param {number} expire 过期时间(秒)，0表示永不过期
   */
  static set(key, value, expire = 0) {
    try {
      const data = {
        value,
        expire: expire > 0 ? Date.now() + expire * 1000 : 0,
        timestamp: Date.now()
      }
      
      Taro.setStorageSync(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  }

  /**
   * 获取存储
   * @param {string} key 键名
   * @param {any} defaultValue 默认值
   */
  static get(key, defaultValue = null) {
    try {
      const dataStr = Taro.getStorageSync(key)
      if (!dataStr) {
        return defaultValue
      }

      const data = JSON.parse(dataStr)
      
      // 检查是否过期
      if (data.expire > 0 && Date.now() > data.expire) {
        this.remove(key)
        return defaultValue
      }

      return data.value
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  }

  /**
   * 移除存储
   * @param {string} key 键名
   */
  static remove(key) {
    try {
      Taro.removeStorageSync(key)
      return true
    } catch (error) {
      console.error('Storage remove error:', error)
      return false
    }
  }

  /**
   * 清空所有存储
   */
  static clear() {
    try {
      Taro.clearStorageSync()
      return true
    } catch (error) {
      console.error('Storage clear error:', error)
      return false
    }
  }

  /**
   * 获取所有键名
   */
  static getKeys() {
    try {
      const info = Taro.getStorageInfoSync()
      return info.keys || []
    } catch (error) {
      console.error('Storage getKeys error:', error)
      return []
    }
  }

  /**
   * 获取存储信息
   */
  static getInfo() {
    try {
      return Taro.getStorageInfoSync()
    } catch (error) {
      console.error('Storage getInfo error:', error)
      return {
        keys: [],
        currentSize: 0,
        limitSize: 0
      }
    }
  }

  /**
   * 检查键是否存在
   * @param {string} key 键名
   */
  static has(key) {
    try {
      const value = Taro.getStorageSync(key)
      return value !== ''
    } catch (error) {
      return false
    }
  }

  /**
   * 设置用户信息
   * @param {object} userInfo 用户信息
   */
  static setUserInfo(userInfo) {
    return this.set('userInfo', userInfo)
  }

  /**
   * 获取用户信息
   */
  static getUserInfo() {
    return this.get('userInfo', {})
  }

  /**
   * 设置token
   * @param {string} token 令牌
   * @param {number} expire 过期时间(秒)
   */
  static setToken(token, expire = 7 * 24 * 60 * 60) {
    return this.set('token', token, expire)
  }

  /**
   * 获取token
   */
  static getToken() {
    return this.get('token', '')
  }

  /**
   * 移除token
   */
  static removeToken() {
    return this.remove('token')
  }

  /**
   * 设置用户设置
   * @param {object} settings 设置对象
   */
  static setSettings(settings) {
    const currentSettings = this.getSettings()
    const newSettings = { ...currentSettings, ...settings }
    return this.set('settings', newSettings)
  }

  /**
   * 获取用户设置
   */
  static getSettings() {
    return this.get('settings', {
      notifications: true,
      locationService: true,
      autoLogin: true,
      theme: 'green'
    })
  }

  /**
   * 设置主题
   * @param {string} theme 主题名称
   */
  static setTheme(theme) {
    return this.set('app-theme', theme)
  }

  /**
   * 获取主题
   */
  static getTheme() {
    return this.get('app-theme', 'green')
  }

  /**
   * 设置缓存数据
   * @param {string} key 键名
   * @param {any} data 数据
   * @param {number} expire 过期时间(秒)，默认1小时
   */
  static setCache(key, data, expire = 3600) {
    return this.set(`cache_${key}`, data, expire)
  }

  /**
   * 获取缓存数据
   * @param {string} key 键名
   * @param {any} defaultValue 默认值
   */
  static getCache(key, defaultValue = null) {
    return this.get(`cache_${key}`, defaultValue)
  }

  /**
   * 移除缓存数据
   * @param {string} key 键名
   */
  static removeCache(key) {
    return this.remove(`cache_${key}`)
  }

  /**
   * 清空所有缓存
   */
  static clearCache() {
    try {
      const keys = this.getKeys()
      const cacheKeys = keys.filter(key => key.startsWith('cache_'))
      
      cacheKeys.forEach(key => {
        this.remove(key)
      })
      
      return true
    } catch (error) {
      console.error('Clear cache error:', error)
      return false
    }
  }
}

export default Storage