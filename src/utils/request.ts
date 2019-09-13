import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import i18n from '@/lang' // internationalization
import { Options } from 'element-ui/types/rate';
import store from '@/store';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    config.headers['authorization'] = 'Bearer ' + store.getters.token
    config.transformRequest = (data) => {
      return JSON.stringify(data)
    }
    return config
  },

  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  response => {
    const { data } = response
    return data
  },
  error => {
    debugger
    if (error.response && error.response.data) {
      if (error.response.data === 'ErrNotAuthorized' || error.response.data === 'jwt expired') {
        MessageBox.confirm(i18n.t('logout_tips') as string, i18n.t('tips') as string, {
          confirmButtonText: i18n.t('relogin'),
          cancelButtonText: i18n.t('cancel'),
          type: 'warning'
        } as Options).then(() => {
          store.dispatch('resetToken')
          location.reload()
        })
      } else {
        const msgIndex = 'errcode.' + error.response.data
        const msg = typeof (i18n.t(msgIndex)) === 'string' ? i18n.t(msgIndex) : error.response.data

        Message({
          message: msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(error)
    } else {
      Message({
        message: i18n.t(error.NoMsg) as string,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }

  }
)

export default service
