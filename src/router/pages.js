import question from '@/pages/pages/question'
import middlewareAuth from '@/middleware/auth'

const pagesRouter = [
  {
    path: 'question',
    name: 'question',
    component: question,
    beforeEnter: middlewareAuth
  }
]

export default pagesRouter
