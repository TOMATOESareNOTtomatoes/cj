import axios from 'axios'
import { Message } from 'element-plus'

// 通过创建新的实例来覆盖默认值
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 请求超时时间
})

// 关闭Cookie传输，防止CSRF攻击
http.defaults.withCredentials = true

// 请求拦截器
http.interceptors.request.use(
  config => {
    /* 解决IE缓存问题 */
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: new Date().getTime()
      }
    }
    // 如果有token就加上
    const token = localStorage.getItem('token')
    if (token !== null && token !== '') {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    const res = response.data // 状态码为200时成功，其余为失败
    if (res.code === 200) {
      return res
    } else {
      Message.error(res.msg || '系统异常，请联系管理员！')
      return Promise.reject(res)
    }
  },
  error => {
    const res = error.response
    if (res.status === undefined) {
      Message.error('无法连接服务器，请检查网络是否正常！')
      return Promise.reject(error)
    } else {
      switch (res.status) {
        case 401:
          Message.warning('请重新登录！')
          break
        case 500:
          Message.error('系统异常，请联系管理员！')
          break
        default:
          Message.error(`错误代码：${res.status}`)
          break
      }
      return Promise.reject(error)
    }
  }
)

export default http
