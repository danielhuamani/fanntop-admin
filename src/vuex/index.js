import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: {
      email: '',
      id: ''
    }
  },
  getters: {
    getUser: state => {
      return state.user.email
    }
  }
})

export default store
