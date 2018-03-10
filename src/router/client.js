import clientList from '@/pages/client/clientList'
import clientRead from '@/pages/client/clientRead'
import middlewareAuth from '@/middleware/auth'

const clientRouter = [
  {
    path: 'client',
    name: 'client',
    component: clientList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'client/:id/read',
    name: 'client_read',
    component: clientRead,
    beforeEnter: middlewareAuth
  }
]

export default clientRouter
