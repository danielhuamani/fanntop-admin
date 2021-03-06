import Vue from 'vue'
import { getToken, authLogout } from './auth'

export default function setupAxios () {
  Vue.axios.interceptors.request.use((config) => {
    let token = getToken()
    if (token) {
      config.headers.common['Authorization'] = 'JWT ' + token
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  Vue.axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    const originalRequest = error.config
    const token = getToken()
    console.log(error.response, 'errors', error.response.data.detail)
    if ((error.response.status === 401 && !originalRequest._retry) ||
      (error.response.data.detail === 'Signature has expired.' && error.response.status === 403) ||
      (error.response.data.detail === 'Invalid signature.' && error.response.status === 403)) {
      console.log(token)
      authLogout()
      window.location.href = '/'

      // originalRequest._retry = true
      // return Vue.axios.post('/security/token-refresh/', {'token': token}).then((result) => {
      //   setTokenData(result.data.token)
      //   originalRequest.headers['Authorization'] = 'JWT ' + result.data.token
      //   return Vue.axios(originalRequest)
      // })
      // .catch((error) => {
      //   console.log('errors', error.response.data.errors)
      //   authLogout()
      //   window.location.href = '/'
      // })
    }
    // if (error.response.status === 404 && !originalRequest._retry) {
    //   originalRequest._retry = true
    //   authLogout()
    //   window.location.href = '/'
    //   return
    // }
    return Promise.reject(error)
  })
}
