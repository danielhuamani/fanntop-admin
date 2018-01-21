import clientList from '@/pages/client/clientList'
import middlewareAuth from '@/middleware/auth'

const clientRouter = [
  {
    path: 'client',
    name: 'client',
    component: clientList,
    beforeEnter: middlewareAuth
  }
]

export default clientRouter
