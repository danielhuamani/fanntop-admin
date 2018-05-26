<template>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-6 page ">
              <div class="d-flex material material--product   content justify-content-center"
              @click="changeIsComponent('productNewInfo')" :class="{'material--active': getIsComponent('productNewInfo')}">
                <h5 class="tab_product">Información del Producto</h5>

              </div>
          </div>
          <div class="col-6 page ">
              <div class="d-flex material material--product content justify-content-center"
              @click="changeIsComponent('productNewVariant')" :class="{'material--active': getIsComponent('productNewVariant')}">
                <h5 class="tab_product" >Variante Producto</h5>
              </div>
          </div>
        </div>
        <transition name="fade" mode="out-in"  appear>
          <productNewInfo v-if="productComponent === 'productNewInfo'"> </productNewInfo>
          <productNewVariant v-if="productComponent === 'productNewVariant'"> </productNewVariant>
        </transition>
       <!--  <component :is="productComponent"></component> -->
      </div>
    </div>
</template>
<script>
  import productNewInfo from '@/components/product/productNewInfo'
  import productNewVariant from '@/components/product/productNewVariant'
  export default {
    name: 'productNewUpdate',
    components: {
      productNewInfo,
      productNewVariant
    },
    created () {
      const self = this
      if (this.$route.query['component']) {
        switch (this.$route.query['component']) {
          case 'productNewInfo':
            self.productComponent = 'productNewInfo'
            break
          case 'productNewVariant':
            self.productComponent = 'productNewVariant'
            break
          default:
            self.productComponent = 'productNewInfo'
        }
      }
    },
    data () {
      return {
        productComponent: 'productNewInfo'
      }
    },
    methods: {
      getIsComponent (nameComponent) {
        return this.productComponent === nameComponent
      },
      changeIsComponent (nameComponent) {
        this.productComponent = nameComponent
        this.$router.push({query: {
          'component': nameComponent
        }})
      }
    }
  }
</script>
<style lang='scss'>
    @import "~styles/abstract/variables";
    .material{
        &--product{
            cursor: pointer;
            padding: 20px 0;
            text-align: center;
            transition: .2s ease all;
            &:hover{
                background-color: #0275d8;
            }
            &:hover .tab_product{
                color: white;
            }

        }
        &--active{
            background-color: #0275d8;
            .tab_product{
                color: white;
            }
        }
    }
    .tab_product{
        margin-bottom: 0;

    }

  .full-width{
    height: 100vh;
    padding: 0px;
    // background: $color-panel;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .content-page{
    margin-top: 90px;
    padding-bottom: 30px;
  }
</style>