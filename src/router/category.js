import categoryList from '@/pages/category/categoryList'
import categoryCreate from '@/pages/category/categoryCreate'
import categoryUpdate from '@/pages/category/categoryUpdate'
import middlewareAuth from '@/middleware/auth'

const categoryRouter = [
  {
    path: 'category',
    name: 'category',
    component: categoryList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'category/create',
    name: 'category_create',
    component: categoryCreate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'category/:id/update',
    name: 'category_update',
    component: categoryUpdate,
    beforeEnter: middlewareAuth
  }
]

export default categoryRouter
