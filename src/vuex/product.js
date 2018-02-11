import Vue from 'vue'

const ModuleProduct = {
  state: {
    attr_attributes: [],
    attribute_ids: [],
    selected_attributes: [],
    product_class_product_attr_value: [],
    familyGroupAttr: []

  },
  getters: {
    attrAttributes: state => {
      return state.attr_attributes
    },
    productClassAttrValue: state => {
      return state.product_class_product_attr_value
    },
    familyGroupAttr: state => {
      return state.familyGroupAttr
    }
  },
  mutations: {
    updateAttrAttributes (state, {data}) {
      state.attr_attributes = data
    },
    updateProductClassAttrValue (state, attrValue) {
      console.log(attrValue)
      state.product_class_product_attr_value = state.product_class_product_attr_value.map(function (index, elem) {
        console.log(index, 'index')
        if (index.attribute === attrValue.attribute) {
          index[attrValue.type] = attrValue.value
        }
        return index
      })
    },
    setProductClassAttr (state, data) {
      state.product_class_product_attr_value = []
      let typeAttr = ''
      let dataAttr = {}
      for (let family of data) {
        for (let attr of family.familygroup_familygroupatribute) {
          switch (attr.type_name) {
            case 'INPUT':
              typeAttr = 'value_input'
              break
            case 'SELECT_SINGLE':
              typeAttr = 'value_option'
              break
          }
          if (!attr.is_variation) {
            dataAttr = {}
            dataAttr['attribute'] = attr.atribute
            dataAttr[typeAttr] = ''
            state.product_class_product_attr_value.push(dataAttr)
          }
        }
      }
    },
    updatefamilyGroupAttr (state, data) {
      state.familyGroupAttr = data
    }
  },
  actions: {
    updateAttrAttributes ({commit}, attributeIds) {
      Vue.axios.get('/product/product-attributes/', {
        params: {
          fields: 'id,name,attribute_options',
          attribute_ids: attributeIds
        }
      }).then(response => {
        commit('updateAttrAttributes', {data: response.data})
      })
    },
    updatefamilyGroupAttr ({commit}, familyId) {
      console.log(familyId, 'familyId')
      if (familyId) {
        Vue.axios.get('/family/family-group/', {
          params: {
            fields: 'id,name,familygroup_familygroupatribute',
            family: familyId
          }
        }).then(response => {
          commit('updatefamilyGroupAttr', response.data)
          commit('setProductClassAttr', response.data)
        })
      } else {
        commit('updatefamilyGroupAttr', [])
      }
    },
    updateProductClassAttrValue ({commit}, attrValue) {
      commit('updateProductClassAttrValue', attrValue)
    }
  }
}

export default ModuleProduct
