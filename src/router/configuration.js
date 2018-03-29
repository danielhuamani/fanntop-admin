import configuration from '@/pages/configuration/configuration'
import shippingCostList from '@/pages/configuration/shippingCostList'
import shippingCostoUpdate from '@/pages/configuration/shippingCostoUpdate'
import middlewareAuth from '@/middleware/auth'

const configurationRouter = [
  {
    path: 'configuration',
    name: 'configuration',
    component: configuration,
    beforeEnter: middlewareAuth
  },
  {
    path: 'shipping-cost',
    name: 'shipping_cost',
    component: shippingCostList,
    beforeEnter: middlewareAuth
  },
  {
    path: 'shipping-cost/:id',
    name: 'shipping_cost_update',
    component: shippingCostoUpdate,
    beforeEnter: middlewareAuth
  }
]

export default configurationRouter
