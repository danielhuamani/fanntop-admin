import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/security/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    }
  ]
})
