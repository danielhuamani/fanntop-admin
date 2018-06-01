<template>
    <div class="row">
      <div class="col-12 page">
        <div class="d-flex">
          <div class="col-8">
            <div class="row material content">
              <div class="col-12   variations">
                <h5 class="material__title">Product Variante</h5>
                <div class="row variations__header">
                  <div class="col-1">
                    <h4 class="variations__header__title">Activo</h4>
                  </div>
                  <div class="col-3">
                    <h4 class="variations__header__title">Name</h4>
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
                <div class="row variations__body align-items-center" v-for='productVariant in products'>
                  <div class="col-1">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" name="checkbox-stacked" :checked='productVariant.is_active' required>
                      <label class="custom-control-label" >
                      </label>
                    </div>
                  </div>
                  <div class="col-3" v-if='productVariant.product_attribute_option.length > 0'>
                    <router-link  :to="{ name: 'product_variant_update', params: { id: $route.params.id, id_variant_update: productVariant.id }}" >
                      <h4 class="variations__body__title" v-for="product in productVariant.product_attribute_option"   >{{product.name_attr}}: {{product.option}}</h4>
                      <h4 class="variations__body__title" >Product</h4>
                    </router-link>
                  </div>
                  <div class="col-3" v-else>
                    <router-link  :to="{ name: 'product_variant_update', params: { id: $route.params.id, id_variant_update: productVariant.id }}" >
                      <h4 class="variations__body__title">Product</h4>
                    </router-link>
                  </div>
                  <div class="col-2">
                    <h4 class="variations__body__title">{{productVariant.price}}</h4>
                  </div>
                  <div class="col-2">
                    <h4 class="variations__body__title">{{productVariant.sku}}</h4>
                  </div>
                  <div class="col-2">
                    <h4 class="variations__body__title">{{productVariant.stock}}</h4>
                  </div>
                  <div class="col-2">
                    <div class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" name="radio-fovarite" :checked='productVariant.is_featured' required>
                      <label class="custom-control-label" >
                      </label>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <productNewAttrVariant v-if="shoProduct" :attributesOption='productClassAttribute.attribute' v-on:resetProducts='resetProducts' :excludeAttributeOption='excludeAttributeOption'></productNewAttrVariant>
          </div>
          <div class="col-4 second_element" v-if='productClassAttribute.is_variation'>
            <div class="row material content">
              <div class="col-12  content__field">
                <div class="" v-for="attribute in productClassAttribute.attribute">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" :id="'attribute' + attribute.id" class="custom-control-input" :value='attribute.id' checked='checked' disabled="disabled" >
                    <label class="custom-control-label" :for="'attribute' + attribute.id"> {{attribute.name}}</label>
                  </div>
                </div>
              </div>
              <div class="col-12 content__field">
                <a href="" class="btn btn-info btn--info" @click.prevent='shoProduct = true'>
                  Agregar Producto
                </a>
              </div>
            </div>
          </div>
        </div>
        <transition name="fade" mode="out-in"  appear>
          <router-view ></router-view>
        </transition>
        <!-- <productNewInfoVariant :productId='productId'  v-if='productId'>
        </productNewInfoVariant> -->
      </div>
    </div>
</template>
<script>
  import productNewAttrVariant from '@/components/product/productNewAttrVariant'
  import productNewInfoVariant from '@/components/product/productNewInfoVariant'
  export default {
    name: 'productNewVariant',
    components: {
      productNewInfoVariant,
      productNewAttrVariant
    },
    data () {
      return {
        products: [],
        productId: '',
        productClassAttribute: [],
        productExcludeAttribute: [],
        shoProduct: false
      }
    },
    created () {
      this.getProducts()
      this.getProductClassAttributes()
    },
    methods: {
      resetProducts () {
        console.log('erest')
        this.getProducts()
        this.shoProduct = false
      },
      getProductClassAttributes () {
        let self = this
        this.axios({
          method: 'get',
          url: '/product/product-class-attributes/' + self.$route.params.id + '/'
        }).then(response => {
          self.productClassAttribute = response.data
        })
      },
      getProducts () {
        let self = this
        this.axios({
          method: 'get',
          url: '/product/product-variant/',
          params: {
            'product_class_id': self.$route.params.id
          }
        }).then(response => {
          self.products = response.data
        })
      },
      setProductExcludeAttribute (idParent, idAttribute) {
        if (this.productExcludeAttribute[idParent]) {
          this.productExcludeAttribute[idParent].push(idAttribute)
        } else {
          this.productExcludeAttribute[idParent] = [idAttribute]
        }
      },
      setProductVariant (productVariantId) {
        this.productId = productVariantId
        this.$store.dispatch('setProductVariantId', productVariantId)
      }
    },
    computed: {
      excludeAttributeOption () {
        let attributes = this.products.map(function (val) {
          console.log(val, 'valllsdsds')
          if (val.attribute_option.length > 0) {
            return val.attribute_option
          }
        })
        if (attributes.length > 0) {
          return attributes
        }
        return []
      }
    }
  }
</script>
<style lang="scss">
@import "~styles/abstract/variables";
  .variations{
    &__body{
      margin: 10px 0;
      &__active{
        background: $color-info;
      }
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
  .custom-control-input:disabled~.custom-control-indicator{
    background-color: #007bff;
  }
</style>