import couponList from '@/pages/coupon/couponList'
import couponCreate from '@/pages/coupon/couponCreate'
import couponUpdate from '@/pages/coupon/couponUpdate'
import middlewareAuth from '@/middleware/auth'

const couponRouter = [
  {
    path: 'coupon',
    name: 'coupon',
    component: couponList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'coupon/create',
    name: 'coupon_create',
    component: couponCreate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'coupon/:id/update',
    name: 'coupon_update',
    component: couponUpdate,
    beforeEnter: middlewareAuth
  }
]

export default couponRouter
