import influencersList from '@/pages/influencers/influencersList'
import influencerDetail from '@/pages/influencers/influencerDetail'
import influencerCreate from '@/pages/influencers/influencerCreate'
import middlewareAuth from '@/middleware/auth'

const influencerRouter = [
  {
    path: 'influencer',
    name: 'influencer',
    component: influencersList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'influencer/:id/update',
    name: 'influencer_detail',
    component: influencerDetail,
    beforeEnter: middlewareAuth
  },
  {
    path: 'influencer/create',
    name: 'influencer_create',
    component: influencerCreate,
    beforeEnter: middlewareAuth
  }
]

export default influencerRouter
