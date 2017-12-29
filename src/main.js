import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './config'
import store from './vuex'
import setupAxios from './utils/interceptors'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.axios.defaults.baseURL = config.baseURL
/* eslint-disable no-new */
setupAxios()

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
