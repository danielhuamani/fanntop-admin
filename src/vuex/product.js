import Vue from 'vue'

const ModuleProduct = {
  state: {
    attr_attributes: [],
    attribute_ids: [],
    selected_attributes: [],
    product_class_product_attr_value: [],
    familyGroupAttr: [],
    productVariantId: null,
    menuActive: false

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
    },
    productClassAttrValueUpdate: state => {
      return state.product_class_product_attr_value.filter(function (val) {
        if (val[val['type']]) {
          return true
        }
        return false
      })
    },
    getProductVariantId: state => {
      return state.productVariantId
    },
    getMenuActive: state => {
      return state.menuActive
    }
  },
  mutations: {
    updateAttrAttributes (state, {data}) {
      state.attr_attributes = data
    },
    setProductVariantId (state, productVariantId) {
      state.productVariantId = productVariantId
    },
    updateProductClassAttrValue (state, attrValue) {
      state.product_class_product_attr_value = state.product_class_product_attr_value.map(function (index, elem) {
        if (index.attribute === attrValue.attribute) {
          index[attrValue.type] = attrValue.value
          if (attrValue.id) {
            index['id'] = attrValue.id
          }
        }
        return index
      })
    },
    setProductClassAttr (state, data) {
      state.product_class_product_attr_value = []
      let typeAttr = ''
      let dataAttr = {}
      for (let attr of data) {
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
          dataAttr['attribute'] = attr.attribute
          dataAttr['id'] = 0
          dataAttr[typeAttr] = ''
          dataAttr['type'] = typeAttr
          state.product_class_product_attr_value.push(dataAttr)
        }
      }
    },
    updatefamilyGroupAttr (state, data) {
      state.familyGroupAttr = data
    },
    setMenuActive (state) {
      state.menuActive = !state.menuActive
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
        Vue.axios.get('/family/family-attribute/', {
          params: {
            family_id: familyId
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
    },
    setProductVariantId  ({commit}, productVariantId) {
      commit('setProductVariantId', productVariantId)
    },
    setMenuActive  ({commit}) {
      commit('setMenuActive')
    }
  }
}

export default ModuleProduct
