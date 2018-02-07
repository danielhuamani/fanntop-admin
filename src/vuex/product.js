import Vue from 'vue'

const ModuleProduct = {
  state: {
    attr_attributes: [],
    attribute_ids: [],
    selected_attributes: []
  },
  getters: {
    attrAttributes: state => {
      return state.attr_attributes
    }
  },
  mutations: {
    updateAttrAttributes (state, {data}) {
      console.log(state, data)
      state.attr_attributes = data
    }
  },
  actions: {
    updateAttrAttributes ({commit}, attributeIds) {
      console.log(attributeIds, 'attribute_ids', commit)
      Vue.axios.get('/product/product-attributes/', {
        params: {
          fields: 'id,name,attribute_options',
          attribute_ids: attributeIds
        }
      }).then(response => {
        commit('updateAttrAttributes', {data: response.data})
      })
    }
  }
}

export default ModuleProduct
