import profile from '@/pages/security/profile'
import changePass from '@/pages/security/changePass'
import middlewareAuth from '@/middleware/auth'

const profileRouter = [
  {
    path: 'profile',
    name: 'profile',
    component: profile,
    beforeEnter: middlewareAuth
  },
  {
    path: 'change_pass',
    name: 'change_pass',
    component: changePass,
    beforeEnter: middlewareAuth
  }
]

export default profileRouter
