<template lang="html">
  <div class="col-12 ">
    <div class="row material content">
      <div class="col-12">
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
            <div class="col-12" v-for="(attr, index) in AttributesOption">
              <div class="row">
                <div class="col-4">
                  {{attr.name}}
                </div>
                <div class="col-8">
                  <div class="row">
                    <div class="col-3" v-for="(option, inde) in attr.attribute_options">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" v-model="selected_attributes" :id='"option" + inde + index' @change="generateProductVariant($event, attr.id, option.option, attr.name)" :value="option.id" class="custom-control-input" >
                        <label class="custom-control-label" :for="'option' + inde + index"> {{option.option}}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="col-12 mt-4 variations">
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
            <h4 class="variations__header__title">Favorito</h4>
          </div>
        </div>
        <div class="row variations__body align-items-center" v-for='(productVariant, index) in mergeProduct'>
          <div class="col-1">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" v-model="selectIdsProductVariant" :id="'productVariant' + index"  @change='selectVariation($event)' :value="isCheckedVariant(productVariant)">
              <label class="custom-control-label" :for="'productVariant' + index"> </label>
            </div>
          </div>
          <div class="col-3">
            <h4 class="variations__body__title" v-for="product in productVariant">{{product.name}}</h4>
          </div>
          <div class="col-2">
            <h4 class="variations__body__title">-</h4>
          </div>
          <div class="col-2">
            <h4 class="variations__body__title">-</h4>
          </div>
          <div class="col-2">
            <h4 class="variations__body__title">-</h4>
          </div>
          <div class="col-2">

         <!--    <label class="custom-control custom-radio" >
              <input type="radio" name="variation" class="custom-control-input" v-model='is_featured' @change='changeIsFeatured(productVariant)'
               :value='getValueAttr(productVariant)'>
              <span class="custom-control-indicator"></span>
            </label> -->
          </div>
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
      mergeProduct: [],
      selectIdsProductVariant: [],
      selectAttrProduct: [],
      is_featured: []
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
      self.selectIdsProductVariant = []
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
        self.products_attributes[idParent] = self.products_attributes[idParent].filter(dict => {
          return dict.attribute_id !== e.target.value
        })

        for (var keysParentAttr in self.products_attributes) {
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
      if (Object.keys(self.products_attributes).length === 0) {
        self.mergeProduct = []
      }
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
    },
    selectVariation (e) {
      const self = this
      let productVariant = self.selectIdsProductVariant.map((key, index) => {
        console.log(self.selectIdsProductVariant, key, index, 'nds')
        return {
          'stock': 0,
          'price': 0,
          'is_featured': false,
          'attribute_option': key
        }
      })
      self.$emit('productAttributes', productVariant)
    },
    changeIsFeatured (productVariant) {
      // var attributes = Object.keys(productVariant).filter((key, index) => {
      //   return productVariant[key]['attribute_id']
      // })
      // value.attribute_option.length == attributes.length
    },
    getValueAttr (productVariant) {
      var attributes = Object.keys(productVariant).map((key, index) => {
        return productVariant[key]['attribute_id']
      })
      return attributes
    },
    isCheckedVariant (productVariant) {
      let attributes = Object.keys(productVariant).map((key, index) => {
        return parseInt(productVariant[key]['attribute_id'])
      })
      return attributes
    }
  },
  computed: {
    AttributesOption () {
      // this.selectAttrProduct = []
      // this.$emit('productAttributes', this.selectAttrProduct)
      return this.$store.getters.attrAttributes
    }
  }
}
</script>

<style lang="css">
</style>
<!-- sku
stock
price
product_class
is_featured
attributes -->