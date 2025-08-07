import Taro from '@tarojs/taro'
import Platform from './platform'

// API基础配置
const BASE_URL = Platform.execute({
  weapp: () => process.env.NODE_ENV === 'development' 
    ? 'https://dev-api.recycling.com' 
    : 'https://api.recycling.com',
  h5: () => process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' 
    : 'https://api.recycling.com',
  default: () => 'https://api.recycling.com'
})

// 请求拦截器
const interceptors = {
  request: [],
  response: []
}

// 添加请求拦截器
export const addRequestInterceptor = (interceptor) => {
  interceptors.request.push(interceptor)
}

// 添加响应拦截器
export const addResponseInterceptor = (interceptor) => {
  interceptors.response.push(interceptor)
}

// 请求封装
const request = async (options) => {
  const {
    url,
    method = 'GET',
    data = {},
    header = {},
    timeout = 10000,
    showLoading = false,
    loadingText = '加载中...',
    showError = true
  } = options

  // 显示加载提示
  if (showLoading) {
    Taro.showLoading({
      title: loadingText,
      mask: true
    })
  }

  try {
    // 获取token
    const token = Taro.getStorageSync('token')
    
    // 构建请求头
    const requestHeader = {
      'Content-Type': 'application/json',
      ...header
    }
    
    if (token) {
      requestHeader.Authorization = `Bearer ${token}`
    }

    // 执行请求拦截器
    let requestConfig = {
      url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
      method,
      data,
      header: requestHeader,
      timeout
    }

    for (const interceptor of interceptors.request) {
      requestConfig = await interceptor(requestConfig)
    }

    // 发起请求
    const response = await Taro.request(requestConfig)

    // 执行响应拦截器
    let processedResponse = response
    for (const interceptor of interceptors.response) {
      processedResponse = await interceptor(processedResponse)
    }

    // 隐藏加载提示
    if (showLoading) {
      Taro.hideLoading()
    }

    // 处理响应
    const { statusCode, data: responseData } = processedResponse

    if (statusCode >= 200 && statusCode < 300) {
      // 检查业务状态码
      if (responseData.code === 0 || responseData.success) {
        return responseData.data || responseData
      } else {
        // 业务错误
        const errorMsg = responseData.message || responseData.msg || '请求失败'
        if (showError) {
          Taro.showToast({
            title: errorMsg,
            icon: 'error'
          })
        }
        throw new Error(errorMsg)
      }
    } else {
      // HTTP错误
      const errorMsg = `请求失败 (${statusCode})`
      if (showError) {
        Taro.showToast({
          title: errorMsg,
          icon: 'error'
        })
      }
      throw new Error(errorMsg)
    }
  } catch (error) {
    // 隐藏加载提示
    if (showLoading) {
      Taro.hideLoading()
    }

    // 处理网络错误
    if (error.errMsg) {
      const errorMsg = error.errMsg.includes('timeout') ? '请求超时' : '网络错误'
      if (showError) {
        Taro.showToast({
          title: errorMsg,
          icon: 'error'
        })
      }
      throw new Error(errorMsg)
    }

    throw error
  }
}

// GET请求
export const get = (url, params = {}, options = {}) => {
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
  
  const fullUrl = queryString ? `${url}?${queryString}` : url
  
  return request({
    url: fullUrl,
    method: 'GET',
    ...options
  })
}

// POST请求
export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

// PUT请求
export const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

// DELETE请求
export const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

// 上传文件
export const upload = (url, filePath, options = {}) => {
  const {
    name = 'file',
    formData = {},
    showLoading = true,
    loadingText = '上传中...'
  } = options

  if (showLoading) {
    Taro.showLoading({
      title: loadingText,
      mask: true
    })
  }

  return new Promise((resolve, reject) => {
    const token = Taro.getStorageSync('token')
    const header = {}
    
    if (token) {
      header.Authorization = `Bearer ${token}`
    }

    Taro.uploadFile({
      url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
      filePath,
      name,
      formData,
      header,
      success: (res) => {
        if (showLoading) {
          Taro.hideLoading()
        }
        
        try {
          const data = JSON.parse(res.data)
          if (data.code === 0 || data.success) {
            resolve(data.data || data)
          } else {
            const errorMsg = data.message || data.msg || '上传失败'
            Taro.showToast({
              title: errorMsg,
              icon: 'error'
            })
            reject(new Error(errorMsg))
          }
        } catch (error) {
          reject(new Error('响应解析失败'))
        }
      },
      fail: (error) => {
        if (showLoading) {
          Taro.hideLoading()
        }
        
        const errorMsg = error.errMsg || '上传失败'
        Taro.showToast({
          title: errorMsg,
          icon: 'error'
        })
        reject(new Error(errorMsg))
      }
    })
  })
}

// 默认导出
export default {
  get,
  post,
  put,
  delete: del,
  upload,
  addRequestInterceptor,
  addResponseInterceptor
}