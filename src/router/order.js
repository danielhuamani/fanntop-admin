import orderList from '@/pages/order/orderList'
import orderReadUpdate from '@/pages/order/orderReadUpdate'
import middlewareAuth from '@/middleware/auth'

const orderRouter = [
  {
    path: 'order',
    name: 'order',
    component: orderList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'order/:id/read',
    name: 'order_read_update',
    component: orderReadUpdate,
    beforeEnter: middlewareAuth
  }
]

export default orderRouter
