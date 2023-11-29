/**
 * fetch封装工具
 * 官方文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
const request = (function () {
  const exports = {};

  const baseURL = 'https://httpbin.org';
  const options = {
    mode: 'cors',
  }

  function post(url, data) {
    return fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options
    })
      .then(resp => resp.json());
  }

  function get(url, params) {
    const query = new URLSearchParams(params).toString();
    return fetch(`${baseURL}${url}?${query}`, {
      method: 'GET',
      headers: {},
      ...options
    })
      .then(resp => resp.json());
  }

  exports.post = post;
  exports.get = get;
  return exports;
})();


const api = (function () {
  const exports = {};

  function post(data) {
    return request.post('/post', data);
  }

  function get(params) {
    return request.get('/get', params);
  }

  exports.post = post;
  exports.get = get;
  return exports;
})();
