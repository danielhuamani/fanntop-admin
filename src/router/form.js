import suscriptionList from '@/pages/form/suscriptionList'
import middlewareAuth from '@/middleware/auth'

const formRouter = [
  {
    path: 'suscription',
    name: 'suscription',
    component: suscriptionList,
    beforeEnter: middlewareAuth
  }
]

export default formRouter
