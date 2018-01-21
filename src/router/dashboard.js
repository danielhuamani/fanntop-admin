import Dashboard from '@/pages/security/dashboard'
import middlewareAuth from '@/middleware/auth'

const dashboardRouter = [
  {
    path: 'dashboard',
    component: Dashboard,
    name: 'dashboard',
    beforeEnter: middlewareAuth
  }
]

export default dashboardRouter
