import suscriptionList from '@/pages/form/suscriptionList'
import contactList from '@/pages/form/contactList'
import listComplaintsBook from '@/pages/form/listComplaintsBook'
import ComplaintsBookRead from '@/pages/form/ComplaintsBookRead'
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
  },
  {
    path: 'libro-reclamaciones',
    name: 'complaints_book',
    component: listComplaintsBook,
    beforeEnter: middlewareAuth
  },
  {
    path: 'libro-reclamaciones/:id/',
    name: 'complaints_book_read',
    component: ComplaintsBookRead,
    beforeEnter: middlewareAuth
  }
]

export default formRouter
