import userList from '@/pages/user/userList'
import userCreate from '@/pages/user/userCreate'
import userUpdate from '@/pages/user/userUpdate'
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
  }
]

export default userRouter
