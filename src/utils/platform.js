import Taro from '@tarojs/taro'

/**
 * 平台判断工具类
 */
class Platform {
  /**
   * 获取当前运行环境
   */
  static getEnv() {
    return Taro.getEnv()
  }

  /**
   * 是否为微信小程序环境
   */
  static isWeapp() {
    return Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  }

  /**
   * 是否为H5环境
   */
  static isH5() {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  }

  /**
   * 是否为支付宝小程序环境
   */
  static isAlipay() {
    return Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
  }

  /**
   * 是否为百度小程序环境
   */
  static isSwan() {
    return Taro.getEnv() === Taro.ENV_TYPE.SWAN
  }

  /**
   * 是否为字节跳动小程序环境
   */
  static isTT() {
    return Taro.getEnv() === Taro.ENV_TYPE.TT
  }

  /**
   * 是否为QQ小程序环境
   */
  static isQQ() {
    return Taro.getEnv() === Taro.ENV_TYPE.QQ
  }

  /**
   * 是否为京东小程序环境
   */
  static isJD() {
    return Taro.getEnv() === Taro.ENV_TYPE.JD
  }

  /**
   * 是否为React Native环境
   */
  static isRN() {
    return Taro.getEnv() === Taro.ENV_TYPE.RN
  }

  /**
   * 是否为小程序环境（包含所有小程序平台）
   */
  static isMiniProgram() {
    const env = Taro.getEnv()
    return [
      Taro.ENV_TYPE.WEAPP,
      Taro.ENV_TYPE.ALIPAY,
      Taro.ENV_TYPE.SWAN,
      Taro.ENV_TYPE.TT,
      Taro.ENV_TYPE.QQ,
      Taro.ENV_TYPE.JD
    ].includes(env)
  }

  /**
   * 是否为移动端环境
   */
  static isMobile() {
    if (this.isMiniProgram() || this.isRN()) {
      return true
    }
    
    if (this.isH5()) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
    
    return false
  }

  /**
   * 是否为桌面端环境
   */
  static isDesktop() {
    return this.isH5() && !this.isMobile()
  }

  /**
   * 获取平台名称
   */
  static getPlatformName() {
    const env = Taro.getEnv()
    const platformNames = {
      [Taro.ENV_TYPE.WEAPP]: '微信小程序',
      [Taro.ENV_TYPE.WEB]: 'H5',
      [Taro.ENV_TYPE.ALIPAY]: '支付宝小程序',
      [Taro.ENV_TYPE.SWAN]: '百度小程序',
      [Taro.ENV_TYPE.TT]: '字节跳动小程序',
      [Taro.ENV_TYPE.QQ]: 'QQ小程序',
      [Taro.ENV_TYPE.JD]: '京东小程序',
      [Taro.ENV_TYPE.RN]: 'React Native'
    }
    
    return platformNames[env] || '未知平台'
  }

  /**
   * 获取系统信息
   */
  static async getSystemInfo() {
    try {
      const systemInfo = await Taro.getSystemInfo()
      return {
        ...systemInfo,
        platform: this.getPlatformName(),
        env: this.getEnv(),
        isMobile: this.isMobile(),
        isDesktop: this.isDesktop(),
        isMiniProgram: this.isMiniProgram()
      }
    } catch (error) {
      console.error('获取系统信息失败:', error)
      return {
        platform: this.getPlatformName(),
        env: this.getEnv(),
        isMobile: this.isMobile(),
        isDesktop: this.isDesktop(),
        isMiniProgram: this.isMiniProgram()
      }
    }
  }

  /**
   * 根据平台执行不同的逻辑
   * @param {Object} handlers 平台处理函数对象
   * @param {Function} handlers.weapp 微信小程序处理函数
   * @param {Function} handlers.h5 H5处理函数
   * @param {Function} handlers.alipay 支付宝小程序处理函数
   * @param {Function} handlers.default 默认处理函数
   */
  static execute(handlers = {}) {
    const env = this.getEnv()
    
    if (env === Taro.ENV_TYPE.WEAPP && handlers.weapp) {
      return handlers.weapp()
    }
    
    if (env === Taro.ENV_TYPE.WEB && handlers.h5) {
      return handlers.h5()
    }
    
    if (env === Taro.ENV_TYPE.ALIPAY && handlers.alipay) {
      return handlers.alipay()
    }
    
    if (env === Taro.ENV_TYPE.SWAN && handlers.swan) {
      return handlers.swan()
    }
    
    if (env === Taro.ENV_TYPE.TT && handlers.tt) {
      return handlers.tt()
    }
    
    if (env === Taro.ENV_TYPE.QQ && handlers.qq) {
      return handlers.qq()
    }
    
    if (env === Taro.ENV_TYPE.JD && handlers.jd) {
      return handlers.jd()
    }
    
    if (env === Taro.ENV_TYPE.RN && handlers.rn) {
      return handlers.rn()
    }
    
    if (handlers.default) {
      return handlers.default()
    }
  }

  /**
   * 获取平台特定的配置
   */
  static getConfig() {
    return this.execute({
      weapp: () => ({
        // 微信小程序特定配置
        canUseCamera: true,
        canUseLocation: true,
        canUsePayment: true,
        canUseShare: true,
        storageLimit: '10MB',
        supportWebview: true
      }),
      h5: () => ({
        // H5特定配置
        canUseCamera: navigator.mediaDevices && navigator.mediaDevices.getUserMedia,
        canUseLocation: navigator.geolocation,
        canUsePayment: false,
        canUseShare: navigator.share,
        storageLimit: '5MB',
        supportWebview: false
      }),
      alipay: () => ({
        // 支付宝小程序特定配置
        canUseCamera: true,
        canUseLocation: true,
        canUsePayment: true,
        canUseShare: true,
        storageLimit: '10MB',
        supportWebview: true
      }),
      default: () => ({
        // 默认配置
        canUseCamera: false,
        canUseLocation: false,
        canUsePayment: false,
        canUseShare: false,
        storageLimit: '1MB',
        supportWebview: false
      })
    })
  }

  /**
   * 检查是否支持某个功能
   * @param {string} feature 功能名称
   */
  static hasFeature(feature) {
    const config = this.getConfig()
    return config[feature] || false
  }

  /**
   * 获取平台特定的样式类名
   */
  static getStyleClass() {
    const env = this.getEnv()
    const classNames = {
      [Taro.ENV_TYPE.WEAPP]: 'platform-weapp',
      [Taro.ENV_TYPE.WEB]: 'platform-h5',
      [Taro.ENV_TYPE.ALIPAY]: 'platform-alipay',
      [Taro.ENV_TYPE.SWAN]: 'platform-swan',
      [Taro.ENV_TYPE.TT]: 'platform-tt',
      [Taro.ENV_TYPE.QQ]: 'platform-qq',
      [Taro.ENV_TYPE.JD]: 'platform-jd',
      [Taro.ENV_TYPE.RN]: 'platform-rn'
    }
    
    const baseClass = this.isMobile() ? 'platform-mobile' : 'platform-desktop'
    const platformClass = classNames[env] || 'platform-unknown'
    
    return `${baseClass} ${platformClass}`
  }

  /**
   * 平台适配的导航方法
   */
  static navigate(url, options = {}) {
    return this.execute({
      weapp: () => {
        // 微信小程序使用原生导航
        return Taro.navigateTo({ url, ...options })
      },
      h5: () => {
        // H5使用路由导航
        return Taro.navigateTo({ url, ...options })
      },
      default: () => {
        return Taro.navigateTo({ url, ...options })
      }
    })
  }

  /**
   * 平台适配的分享方法
   */
  static share(options = {}) {
    return this.execute({
      weapp: () => {
        // 微信小程序分享
        return Taro.showShareMenu(options)
      },
      h5: () => {
        // H5 Web Share API
        if (navigator.share) {
          return navigator.share(options)
        } else {
          // 降级处理：复制链接
          if (navigator.clipboard && options.url) {
            return navigator.clipboard.writeText(options.url)
          }
        }
      },
      default: () => {
        console.log('当前平台不支持分享功能')
        return Promise.resolve()
      }
    })
  }
}

export default Platform