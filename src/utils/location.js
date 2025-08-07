import Taro from '@tarojs/taro'
import Storage from './storage'

/**
 * 位置服务封装
 */
class LocationService {
  /**
   * 获取当前位置
   * @param {object} options 配置选项
   */
  static async getCurrentLocation(options = {}) {
    const {
      type = 'gcj02',
      altitude = false,
      highAccuracyExpireTime = 3000,
      timeout = 10000,
      cache = true,
      cacheTime = 300 // 缓存5分钟
    } = options

    try {
      // 检查缓存
      if (cache) {
        const cachedLocation = Storage.getCache('currentLocation')
        if (cachedLocation) {
          return cachedLocation
        }
      }

      // 检查位置权限
      const authResult = await this.checkLocationAuth()
      if (!authResult) {
        throw new Error('位置权限被拒绝')
      }

      // 获取位置
      const location = await new Promise((resolve, reject) => {
        Taro.getLocation({
          type,
          altitude,
          highAccuracyExpireTime,
          timeout,
          success: resolve,
          fail: reject
        })
      })

      const result = {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        altitude: location.altitude || 0,
        speed: location.speed || 0,
        timestamp: Date.now()
      }

      // 缓存位置信息
      if (cache) {
        Storage.setCache('currentLocation', result, cacheTime)
      }

      return result
    } catch (error) {
      console.error('获取位置失败:', error)
      throw new Error(this.getLocationErrorMessage(error))
    }
  }

  /**
   * 检查位置权限
   */
  static async checkLocationAuth() {
    try {
      const authSetting = await Taro.getSetting()
      
      if (authSetting.authSetting['scope.userLocation'] === false) {
        // 权限被拒绝，引导用户开启
        const result = await Taro.showModal({
          title: '位置权限',
          content: '需要获取您的位置信息来查找附近的回收箱，请在设置中开启位置权限',
          confirmText: '去设置',
          cancelText: '取消'
        })

        if (result.confirm) {
          await Taro.openSetting()
          // 重新检查权限
          const newAuthSetting = await Taro.getSetting()
          return newAuthSetting.authSetting['scope.userLocation'] !== false
        }
        return false
      }

      if (authSetting.authSetting['scope.userLocation'] === undefined) {
        // 首次请求权限
        try {
          await Taro.authorize({ scope: 'scope.userLocation' })
          return true
        } catch (error) {
          return false
        }
      }

      return true
    } catch (error) {
      console.error('检查位置权限失败:', error)
      return false
    }
  }

  /**
   * 计算两点间距离
   * @param {number} lat1 纬度1
   * @param {number} lng1 经度1
   * @param {number} lat2 纬度2
   * @param {number} lng2 经度2
   * @returns {number} 距离(米)
   */
  static calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000 // 地球半径(米)
    const dLat = this.toRadians(lat2 - lat1)
    const dLng = this.toRadians(lng2 - lng1)
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    
    return Math.round(R * c)
  }

  /**
   * 角度转弧度
   */
  static toRadians(degrees) {
    return degrees * (Math.PI / 180)
  }

  /**
   * 格式化距离显示
   * @param {number} distance 距离(米)
   */
  static formatDistance(distance) {
    if (distance < 1000) {
      return `${distance}m`
    } else {
      return `${(distance / 1000).toFixed(1)}km`
    }
  }

  /**
   * 获取附近的回收箱
   * @param {array} recycleBoxes 回收箱列表
   * @param {object} userLocation 用户位置
   * @param {number} maxDistance 最大距离(米)
   */
  static getNearbyRecycleBoxes(recycleBoxes, userLocation, maxDistance = 5000) {
    if (!userLocation || !recycleBoxes) {
      return []
    }

    return recycleBoxes
      .map(box => {
        const distance = this.calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          box.latitude,
          box.longitude
        )
        
        return {
          ...box,
          distance,
          distanceText: this.formatDistance(distance)
        }
      })
      .filter(box => box.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
  }

  /**
   * 打开地图导航
   * @param {object} destination 目的地
   */
  static async openMapNavigation(destination) {
    const { latitude, longitude, name, address } = destination

    try {
      await Taro.openLocation({
        latitude,
        longitude,
        name: name || '目的地',
        address: address || '',
        scale: 18
      })
    } catch (error) {
      console.error('打开地图导航失败:', error)
      Taro.showToast({
        title: '打开地图失败',
        icon: 'error'
      })
    }
  }

  /**
   * 选择位置
   */
  static async chooseLocation() {
    try {
      const result = await Taro.chooseLocation()
      return {
        name: result.name,
        address: result.address,
        latitude: result.latitude,
        longitude: result.longitude
      }
    } catch (error) {
      console.error('选择位置失败:', error)
      throw new Error('选择位置失败')
    }
  }

  /**
   * 获取位置错误信息
   */
  static getLocationErrorMessage(error) {
    const errorMessages = {
      'getLocation:fail auth deny': '位置权限被拒绝',
      'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF': '请开启手机定位服务',
      'getLocation:fail timeout': '定位超时，请检查网络连接',
      'getLocation:fail:fail': '定位失败，请稍后重试'
    }

    const errMsg = error.errMsg || error.message || ''
    return errorMessages[errMsg] || '获取位置失败'
  }

  /**
   * 监听位置变化
   * @param {function} callback 回调函数
   * @param {object} options 配置选项
   */
  static watchPosition(callback, options = {}) {
    const {
      type = 'gcj02',
      interval = 5000,
      accuracy = 'best'
    } = options

    try {
      Taro.startLocationUpdate({
        type,
        success: () => {
          Taro.onLocationChange(callback)
        },
        fail: (error) => {
          console.error('开始位置监听失败:', error)
        }
      })
    } catch (error) {
      console.error('监听位置变化失败:', error)
    }
  }

  /**
   * 停止监听位置变化
   */
  static stopWatchPosition() {
    try {
      Taro.stopLocationUpdate()
      Taro.offLocationChange()
    } catch (error) {
      console.error('停止位置监听失败:', error)
    }
  }
}

export default LocationService