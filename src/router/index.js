import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/security/login'
import Page from '@/pages/security/contentPage'
import categoryRouter from './category'
import dashboardRouter from './dashboard'
import clientRouter from './client'
import influencerRouter from './influencer'
import attributeRouter from './attribute'
import productRouter from './product'
import familyRouter from './family'
import homeRouter from './home'
Vue.use(Router)
const routerChildren = [
  ...dashboardRouter,
  ...clientRouter,
  ...categoryRouter,
  ...influencerRouter,
  ...attributeRouter,
  ...productRouter,
  ...familyRouter,
  ...homeRouter]

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
      children: routerChildren
    }
  ]
})
