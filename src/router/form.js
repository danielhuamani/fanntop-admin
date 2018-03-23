import suscriptionList from '@/pages/form/suscriptionList'
import contactList from '@/pages/form/contactList'
import middlewareAuth from '@/middleware/auth'

const formRouter = [
  {
    path: 'suscription',
    name: 'suscription',
    component: suscriptionList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'contact',
    name: 'contact',
    component: contactList,
    beforeEnter: middlewareAuth
  }
]

export default formRouter
