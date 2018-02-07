import Vue from 'vue'
import Vuex from 'vuex'
import ModuleProduct from './product'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    ModuleProduct: ModuleProduct
  }
})

export default store
