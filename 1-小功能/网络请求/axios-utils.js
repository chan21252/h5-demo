/**
 * 一个简单的axios工具封装
 * axios文档：https://www.axios-http.cn/docs/intro
 */
// axios对象
const request = (function () {
  const options = {
    baseURL: 'https://httpbin.org',
    timeout: 2000,
    withCredentials: true,
  }
  const instance = axios.create({
    ...options,
  })

  // 请求拦截器
  instance.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  // 响应拦截器
  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  instance.defaults.headers.post.Accept = 'application/json'
  instance.defaults.headers.post['Content-Type'] = 'application/json'

  return instance
})()

// api接口封装
const api = (function () {
  const exports = {}

  function post(data) {
    return request.post('/post', data, {})
  }

  function get(query) {
    return request.get('/get', {
      params: query,
    })
  }

  exports.post = post
  exports.get = get
  return exports
})()
