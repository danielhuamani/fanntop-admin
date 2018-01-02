import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/security/login'
import Page from '@/pages/security/contentPage'
import Dashboard from '@/pages/security/dashboard'
import clientList from '@/pages/client/clientList'
import influencersList from '@/pages/influencers/influencersList'
import influencerDetail from '@/pages/influencers/influencerDetail'
import influencerCreate from '@/pages/influencers/influencerCreate'
import middlewareAuth from '@/middleware/auth'

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
      path: '/',
      name: 'page',
      component: Page,
      auth: true,
      children: [
        {
          path: 'dashboard',
          component: Dashboard,
          name: 'dashboard',
          beforeEnter: middlewareAuth
        },
        {
          path: 'client',
          name: 'client',
          component: clientList,
          beforeEnter: middlewareAuth
        },
        {
          path: 'influencer',
          name: 'influencer',
          component: influencersList,
          beforeEnter: middlewareAuth
        },
        {
          path: 'influencer/:id/update',
          name: 'influencer_detail',
          component: influencerDetail,
          beforeEnter: middlewareAuth
        },
        {
          path: 'influencer/create',
          name: 'influencer_create',
          component: influencerCreate,
          beforeEnter: middlewareAuth
        }
      ]
    }
  ]
})
