import productList from '@/pages/product/productList'
import productCreate from '@/pages/product/productCreate'
import middlewareAuth from '@/middleware/auth'

const productRouter = [
  {
    path: 'product',
    name: 'product',
    component: productList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'product/create',
    name: 'product_create',
    component: productCreate,
    beforeEnter: middlewareAuth
  }
]

export default productRouter
