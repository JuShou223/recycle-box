/**
 * 应用常量定义
 */

// API相关常量
export const API = {
  BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' 
    : 'https://api.recycling.com',
  TIMEOUT: 10000,
  RETRY_COUNT: 3
}

// 存储键名常量
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  SETTINGS: 'settings',
  THEME: 'app-theme',
  LOCATION: 'currentLocation',
  CACHE_PREFIX: 'cache_'
}

// 页面路径常量
export const PAGES = {
  INDEX: '/pages/index/index',
  RECYCLE: '/pages/recycle/index',
  POINTS: '/pages/points/index',
  PROFILE: '/pages/profile/index',
  MESSAGES: '/pages/messages/index',
  SCAN: '/pages/scan/index',
  MAP: '/pages/map/index',
  EXCHANGE: '/pages/exchange/index',
  RANKING: '/pages/ranking/index'
}

// 垃圾分类常量
export const WASTE_TYPES = {
  PAPER: {
    id: 'paper',
    name: '纸类',
    icon: '📄',
    color: '#1890ff',
    points: 2,
    examples: ['报纸', '杂志', '纸箱', '办公用纸', '书本', '包装纸']
  },
  PLASTIC: {
    id: 'plastic',
    name: '塑料',
    icon: '🥤',
    color: '#52c41a',
    points: 3,
    examples: ['塑料瓶', '塑料袋', '塑料盒', '泡沫', '塑料玩具', '塑料餐具']
  },
  METAL: {
    id: 'metal',
    name: '金属',
    icon: '🥫',
    color: '#faad14',
    points: 5,
    examples: ['易拉罐', '金属盒', '废铁', '铜线', '铝制品', '不锈钢制品']
  },
  KITCHEN: {
    id: 'kitchen',
    name: '厨余',
    icon: '🍎',
    color: '#f5222d',
    points: 1,
    examples: ['果皮', '菜叶', '剩饭', '茶叶渣', '蛋壳', '骨头']
  },
  GLASS: {
    id: 'glass',
    name: '玻璃',
    icon: '🍾',
    color: '#13c2c2',
    points: 4,
    examples: ['玻璃瓶', '玻璃杯', '窗玻璃', '镜子', '玻璃制品']
  },
  TEXTILE: {
    id: 'textile',
    name: '纺织物',
    icon: '👕',
    color: '#722ed1',
    points: 2,
    examples: ['旧衣服', '床单', '毛巾', '鞋子', '包包', '布料']
  }
}

// 回收箱状态常量
export const RECYCLE_BOX_STATUS = {
  AVAILABLE: {
    id: 'available',
    name: '可用',
    color: '#52c41a'
  },
  FULL: {
    id: 'full',
    name: '已满',
    color: '#f5222d'
  },
  MAINTENANCE: {
    id: 'maintenance',
    name: '维护中',
    color: '#faad14'
  },
  OFFLINE: {
    id: 'offline',
    name: '离线',
    color: '#8c8c8c'
  }
}

// 用户等级常量
export const USER_LEVELS = {
  1: { name: '环保新手', minPoints: 0, maxPoints: 499, color: '#8c8c8c' },
  2: { name: '环保爱好者', minPoints: 500, maxPoints: 999, color: '#52c41a' },
  3: { name: '环保达人', minPoints: 1000, maxPoints: 1999, color: '#1890ff' },
  4: { name: '环保专家', minPoints: 2000, maxPoints: 3999, color: '#722ed1' },
  5: { name: '环保大师', minPoints: 4000, maxPoints: 7999, color: '#fa8c16' },
  6: { name: '环保王者', minPoints: 8000, maxPoints: 15999, color: '#eb2f96' },
  7: { name: '环保传奇', minPoints: 16000, maxPoints: 31999, color: '#faad14' },
  8: { name: '环保神话', minPoints: 32000, maxPoints: Infinity, color: '#f5222d' }
}

// 积分兑换类型常量
export const EXCHANGE_TYPES = {
  COUPON: {
    id: 'coupon',
    name: '优惠券',
    icon: '🎫'
  },
  CASH: {
    id: 'cash',
    name: '现金红包',
    icon: '💰'
  },
  GIFT: {
    id: 'gift',
    name: '实物奖品',
    icon: '🎁'
  },
  RECHARGE: {
    id: 'recharge',
    name: '话费充值',
    icon: '📱'
  }
}

// 消息类型常量
export const MESSAGE_TYPES = {
  RECYCLE: {
    id: 'recycle',
    name: '回收记录',
    icon: '♻️'
  },
  ACTIVITY: {
    id: 'activity',
    name: '活动通知',
    icon: '🎉'
  },
  SYSTEM: {
    id: 'system',
    name: '系统消息',
    icon: '📢'
  },
  POINTS: {
    id: 'points',
    name: '积分变动',
    icon: '💰'
  },
  EXCHANGE: {
    id: 'exchange',
    name: '兑换记录',
    icon: '🎁'
  }
}

// 主题常量
export const THEMES = {
  GREEN: 'green',
  BLUE: 'blue',
  ORANGE: 'orange',
  PURPLE: 'purple'
}

// 地图相关常量
export const MAP = {
  DEFAULT_LATITUDE: 39.908823,
  DEFAULT_LONGITUDE: 116.397470,
  DEFAULT_SCALE: 15,
  MARKER_WIDTH: 30,
  MARKER_HEIGHT: 30,
  MAX_DISTANCE: 5000 // 最大搜索距离(米)
}

// 时间格式常量
export const TIME_FORMAT = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  MONTH_DAY: 'MM-DD',
  HOUR_MINUTE: 'HH:mm'
}

// 文件上传常量
export const UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif']
}

// 分页常量
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
}

// 缓存时间常量(秒)
export const CACHE_TIME = {
  SHORT: 300,      // 5分钟
  MEDIUM: 1800,    // 30分钟
  LONG: 3600,      // 1小时
  VERY_LONG: 86400 // 24小时
}

// 正则表达式常量
export const REGEX = {
  PHONE: /^1[3-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ID_CARD: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
}

// 错误码常量
export const ERROR_CODES = {
  SUCCESS: 0,
  UNKNOWN_ERROR: -1,
  NETWORK_ERROR: -2,
  TIMEOUT_ERROR: -3,
  AUTH_ERROR: 401,
  FORBIDDEN_ERROR: 403,
  NOT_FOUND_ERROR: 404,
  SERVER_ERROR: 500
}

// 环境常量
export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
}

// 平台常量
export const PLATFORMS = {
  WEAPP: 'weapp',
  H5: 'h5',
  RN: 'rn',
  SWAN: 'swan',
  ALIPAY: 'alipay',
  TT: 'tt',
  QQ: 'qq',
  JD: 'jd'
}

// 平台常量
export const PLATFORMS = {
  WEAPP: 'weapp',
  H5: 'h5',
  RN: 'rn',
  SWAN: 'swan',
  ALIPAY: 'alipay',
  TT: 'tt',
  QQ: 'qq',
  JD: 'jd'
}

// 默认配置
export const DEFAULT_CONFIG = {
  theme: THEMES.GREEN,
  notifications: true,
  locationService: true,
  autoLogin: true,
  language: 'zh-CN'
}

// 导出所有常量
export default {
  API,
  STORAGE_KEYS,
  PAGES,
  WASTE_TYPES,
  RECYCLE_BOX_STATUS,
  USER_LEVELS,
  EXCHANGE_TYPES,
  MESSAGE_TYPES,
  THEMES,
  MAP,
  TIME_FORMAT,
  UPLOAD,
  PAGINATION,
  CACHE_TIME,
  REGEX,
  ERROR_CODES,
  ENV,
  PLATFORMS,
  DEFAULT_CONFIG
}