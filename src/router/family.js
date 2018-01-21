import familyList from '@/pages/family/familyList'
import familyCreate from '@/pages/family/familyCreate'
import familyUpdate from '@/pages/family/familyUpdate'
import middlewareAuth from '@/middleware/auth'

const familyRouter = [
  {
    path: 'family',
    name: 'family',
    component: familyList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'family/create',
    name: 'family_create',
    component: familyCreate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'family/:id/update',
    name: 'family_update',
    component: familyUpdate,
    beforeEnter: middlewareAuth
  }
]

export default familyRouter
