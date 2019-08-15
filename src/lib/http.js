const axios = require('axios')
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const qs = require('qs')
import { Message } from 'element-ui'
// const store = require('@/lib/localStorage')['default']
// const sessionStore = require('@/lib/sessionStorage')['default']
/*
 more usage visit
 https://github.com/ljharb/qs
 可以参考https://segmentfault.com/q/1010000008698726/a-1020000008699952
 由于axios默认发送数据时是request payload，而并非我们常用的form data格式，所以发送之前需要使用qs模块对其进行处理
*/
const instance = axios.create({
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
})
const instance2 = axios.create({
  headers: {'Content-Type': 'application/multipart/form-data;charset=utf-8'}
})
const instance3 = axios.create({
  headers: {'Content-Type': 'application/json;charset=utf-8'}
})
const post = (url, params) => {
  // let auth = {}
  // if (params && params['token']) {
  //   auth['Token'] = params['token']
  // } else {
  //   auth = JSON.parse(sessionStore.get('auth-user'))
  //   if (!auth) {
  //     auth = {}
  //   }
  // }
  // console.log(auth.Token)
  // token: auth.Token,
  return instance.post(url, qs.stringify({...params}))
  // return instance.post(url, qs.stringify({Token: 'Zjc4ZTRlN2YwNmNhMjAwZjg1ZGRmZWQ0NjRhMzc5NTE=', ...params}))
  .then(res => {
    if (res.status === 200) {
      return res.data
    }
  })
  .catch(e => {
    Message({type: 'warning', message: '网络异常'})
  })
}
const get = (url, params) => {
  // let auth = {}
  // if (params && params['token']) {
  //   auth['Token'] = params['token']
  // } else {
  //   auth = JSON.parse(sessionStore.get('auth-user'))
  //   if (!auth) {
  //     auth = {}
  //   }
  // }
  return instance.get(url + '?' + qs.stringify({...params}))
  .then(res => {
    if (res.status === 200) {
      return res.data
    }
  })
  .catch(e => {
    Message({type: 'warning', message: '网络异常'})
  })
}
const postJSON = (url, params) => {
  return instance2.post(url, {...params})
  .then(res => {
    if (res.status === 200) {
      return res.data
    }
  })
  .catch(e => {
    Message({type: 'warning', message: '网络异常'})
  })
}
const postJSON2 = (url, params) => {
  return instance3.post(url, {...params})
  .then(res => {
    if (res.status === 200) {
      return res.data
    }
  })
  .catch(e => {
    Message({type: 'warning', message: '网络异常'})
  })
}
export default {
  post,
  get,
  postJSON,
  postJSON2
}
