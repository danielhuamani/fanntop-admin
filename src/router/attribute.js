import attributesList from '@/pages/attribute/attributesList'
import middlewareAuth from '@/middleware/auth'
import attributeCreate from '@/pages/attribute/attributeCreate'
import attributeUpdate from '@/pages/attribute/attributeUpdate'

const attributesRouter = [
  {
    path: 'attribute',
    name: 'attribute',
    component: attributesList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'attribute/:id/update',
    name: 'attribute_update',
    component: attributeUpdate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'attribute/create',
    name: 'attribute_create',
    component: attributeCreate,
    beforeEnter: middlewareAuth
  }
]

export default attributesRouter
