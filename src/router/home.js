import homeList from '@/pages/pages/home/homeList'
import homeCreate from '@/pages/pages/home/homeCreate'
import homeUpdate from '@/pages/pages/home/homeUpdate'
import middlewareAuth from '@/middleware/auth'

const homeRouter = [
  {
    path: 'home',
    name: 'home',
    component: homeList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'home/create',
    name: 'home_create',
    component: homeCreate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'home/:id/update',
    name: 'home_update',
    component: homeUpdate,
    beforeEnter: middlewareAuth
  }
]

export default homeRouter
