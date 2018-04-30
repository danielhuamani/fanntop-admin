import userList from '@/pages/user/userList'
import userCreate from '@/pages/user/userCreate'
import userUpdate from '@/pages/user/userUpdate'
import userChangePass from '@/pages/user/userChangePass'
import middlewareAuth from '@/middleware/auth'

const userRouter = [
  {
    path: 'user',
    name: 'user',
    component: userList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'user/crear',
    name: 'user_create',
    component: userCreate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'user/:id/actualizar',
    name: 'user_update',
    component: userUpdate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'user/:id/cambiar-password',
    name: 'user_change_pass',
    component: userChangePass,
    beforeEnter: middlewareAuth
  }
]

export default userRouter
