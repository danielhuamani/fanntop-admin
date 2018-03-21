import configuration from '@/pages/configuration/configuration'
import middlewareAuth from '@/middleware/auth'

const configurationRouter = [
  {
    path: 'configuration',
    name: 'configuration',
    component: configuration,
    beforeEnter: middlewareAuth
  }
]

export default configurationRouter
