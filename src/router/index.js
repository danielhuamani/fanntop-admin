import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/security/login'
import Dashboard from '@/pages/security/dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
