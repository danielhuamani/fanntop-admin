import productList from '@/pages/product/productList'
import productCreate from '@/pages/product/productCreate'
// import productUpdate from '@/pages/product/productUpdate'
import productNewUpdate from '@/pages/product/productNewUpdate'
import productVariantUpdate from '@/pages/product/productVariantUpdate'
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
  },
  {
    path: 'product/:id/update',
    name: 'product_update',
    component: productNewUpdate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'product/:id/:id_variant_update/update',
    name: 'product_variant_update',
    component: productVariantUpdate,
    beforeEnter: middlewareAuth
  }
]

export default productRouter
