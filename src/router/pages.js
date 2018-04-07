import pagesList from '@/pages/pages/pagesList'
import pagesCreate from '@/pages/pages/pagesCreate'
import pagesUpdate from '@/pages/pages/pagesUpdate'
import termsConditions from '@/pages/pages/termsConditions'
import paymentMethods from '@/pages/pages/paymentMethods'
import questionResponseList from '@/pages/pages/questionResponseList'
import frecuentQuestionCreate from '@/pages/pages/frecuentQuestionCreate'
import frecuentQuestionUpdate from '@/pages/pages/frecuentQuestionUpdate'
import question from '@/pages/pages/question'
import middlewareAuth from '@/middleware/auth'

const pagesRouter = [
  {
    path: 'question',
    name: 'question',
    component: question,
    beforeEnter: middlewareAuth
  },
  {
    path: 'terminos-condiciones',
    name: 'terms_conditions',
    component: termsConditions,
    beforeEnter: middlewareAuth
  },
  {
    path: 'forma-pago',
    name: 'payment_methods',
    component: paymentMethods,
    beforeEnter: middlewareAuth
  },
  {
    path: 'pages',
    name: 'pages',
    component: pagesList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'pages/create/',
    name: 'pages_create',
    component: pagesCreate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'pages/:id/update',
    name: 'pages_update',
    component: pagesUpdate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'frecuent-question',
    name: 'frecuent_question',
    component: questionResponseList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'frecuent-question/create',
    name: 'frecuent_question_create',
    component: frecuentQuestionCreate,
    beforeEnter: middlewareAuth
  },
  {
    path: 'frecuent-question/:id/update',
    name: 'frecuent_question_update',
    component: frecuentQuestionUpdate,
    beforeEnter: middlewareAuth
  }
]

export default pagesRouter
