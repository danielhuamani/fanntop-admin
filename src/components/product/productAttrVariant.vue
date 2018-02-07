<template lang="html">
  <div class="">
    <div class="col-12 material content">
      <h5 class="material__title">Variantes</h5>
      <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-4">
                Atributo
              </div>
              <div class="col-8">
                Valores
              </div>
            </div>
          </div>
          <div class="col-12" v-for="attr in AttributesOption">
            <div class="row">
              <div class="col-4">
                {{attr.name}}
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-3" v-for="option in attr.attribute_options">
                    <label class="custom-control custom-checkbox">
                      <input type="checkbox" v-model="selected_attributes" @change="generateProductVariant($event, attr.id, option.option, attr.name)" :value="option.id" class="custom-control-input" >
                      <span class="custom-control-indicator"></span>
                      {{option.option}}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="col-12 material content variations">
      <h5 class="material__title">Variaciones</h5>
      <div class="row variations__header">
        <div class="col-1">
        </div>
        <div class="col-3">
          <h4 class="variations__header__title">Variación</h4>
        </div>
        <div class="col-2">
          <h4 class="variations__header__title">Precio</h4>
        </div>
        <div class="col-2">
          <h4 class="variations__header__title">SKU</h4>
        </div>
        <div class="col-2">
          <h4 class="variations__header__title">Inventario</h4>
        </div>
        <div class="col-2">
          <h4 class="variations__header__title"></h4>
        </div>
      </div>
      <div class="row variations__body align-items-center" v-for='productVariant in mergeProduct'>
        <div class="col-1">
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" value="10">
            <span class="custom-control-indicator"></span>
          </label>
        </div>
        <div class="col-3">
          <h4 class="variations__body__title" v-for="product in productVariant">{{product.name}}</h4>

        </div>
        <div class="col-2">
          <h4 class="variations__body__title">Precio</h4>
        </div>
        <div class="col-2">
          <h4 class="variations__body__title">SKU</h4>
        </div>
        <div class="col-2">
          <h4 class="variations__body__title">Inventario</h4>
        </div>
        <div class="col-2">
          <h4 class="variations__body__title"></h4>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "~styles/abstract/variables";
.variations{

  &__body{
    margin: 10px 0;

    &__title{
      font-size: 14px;
      margin: 0;
    }
  }
  &__header{
    border-bottom: 1px solid $color-gray-cl;
    margin: 0;
    &__title{
      font-size: 14px;
      margin: 0;
    }
  }

}
</style>
<script>
export default {
  name: 'productAttrVariant',
  props: ['is_variation', 'attribute_ids'],
  data () {
    return {
      attributes: [],
      selected_attributes: [],
      products_attributes: {},
      mergeProduct: []
    }
  },
  created () {
    console.log(this.attribute_ids, 'attribute_ids')
  },
  mounted () {
  },
  methods: {
    generateProductVariant (e, idParent, name, nameParent) {
      var self = this
      // Se verifica si se ha checkeado
      if (e.target.checked) {
        if (self.products_attributes[idParent]) {
          // si se obtiene el parent se agrega id hacian el parent
          self.products_attributes[idParent].push({
            'attribute_id': e.target.value,
            'name': nameParent + ': ' + name
          })
        } else {
          // si not obtiene el parent se crea y se agrega id hacian el parent
          self.products_attributes[idParent] = []
          self.products_attributes[idParent].push({
            'attribute_id': e.target.value,
            'name': nameParent + ': ' + name
          })
        }
      } else {
        console.log('else', self.products_attributes[idParent])
        self.products_attributes[idParent] = self.products_attributes[idParent].filter(dict => {
          return dict.attribute_id !== e.target.value
        })

        for (var keysParentAttr in self.products_attributes) {
          console.log(self.products_attributes[keysParentAttr], 'Object.keys(self.products_attributes)', keysParentAttr)
          if (self.products_attributes[keysParentAttr].length === 0) {
            delete self.products_attributes[keysParentAttr]
          }
        }
      }
      if (Object.keys(self.products_attributes).length === 2) {
        self.forTwoLevel(Object.values(self.products_attributes)[0], Object.values(self.products_attributes)[1])
      }
      if (Object.keys(self.products_attributes).length === 1) {
        self.forOneLevel(Object.values(self.products_attributes)[0])
      }
    },
    getAttributesOption () {
      const self = this
      this.axios.get('/product/product-attributes/', {
        params: {
          fields: 'id,name,attribute_options',
          attribute_ids: self.attribute_ids
        }
      }).then(response => {
        self.attributes = response.data
      })
    },
    forOneLevel (levelOne) {
      const self = this
      self.mergeProduct = []
      for (var one in levelOne) {
        self.mergeProduct.push([levelOne[one]])
        console.log(levelOne[one])
      }
    },
    forTwoLevel (levelOne, levelTwo) {
      const self = this
      self.mergeProduct = []
      for (var one in levelOne) {
        for (var two in levelTwo) {
          console.log(levelOne[one], levelTwo[two])
          self.mergeProduct.push([levelOne[one], levelTwo[two]])
        }
      }
    }
  },
  computed: {
    AttributesOption () {
      return this.$store.getters.attrAttributes
    }
  }
}
</script>

<style lang="css">
</style>
