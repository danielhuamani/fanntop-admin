<template>
  <form @submit.prevent="saveProduct()" class="d-flex material content_paso content position-relative">
    <div class="col-12 ">
      <h5 class="material__title">{{name}} SKU'S</h5>
      <div class="row">
        <div class="col-8">
          <div class="row">
            <productAttrVariant v-if="product.attribute.length > 0 && product.is_variation"  v-on:productAttributes='productAttributes' :is_variation="product.is_variation" :attribute_ids='product.attribute'></productAttrVariant>

          </div>
        </div>
        <div class="col-4">
          <div class="col-12 content__field">
            <label for="">Grupo de Atributo</label>
            <select  name="family" v-validate="'required'" :class="{'input': true, 'form-control--error': errors.has('family') }"  class="custom-select" v-model='product.family' @change="getAttributesVariation" >
              <option value=""  >Seleccione Grupo</option>
              <option v-for="family in families" :value="family.id">{{family.name}}</option>
            </select>
          </div>
          <div class="col-12 content__field content__field--check" v-if="attributes_variations.length > 0">
            <label for="">Variacion</label>
            <div class="slider-checkbox">
              <input type="checkbox" id="1"  v-model="product.is_variation" @change="changeVariation($event)" />
              <label class="label" for="1">
                <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
              </label>
            </div>
          </div>
          <div class="col-12 content__field" v-if="product.is_variation">
            <div class="" v-for="variation in attributes_variations">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" :value="variation.id" class="custom-control-input" :id="'variation' + variation.id" @change="updateAttributeId" v-model="product.attribute">
                <label class="custom-control-label" :for="'variation' + variation.id"> {{variation.name}}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
      </div>
    </div>
    <div class="d-flex justify-content-between next_page">
      <router-link :to="{ name: 'product_update_paso_1', params: { id: $route.params.id }}"  class="btn btn-success">
        Atras
      </router-link>
      <div class="btn btn-success" v-if='load'>
        <div class="loader_btn" ></div>
      </div>
      <button  class='btn btn-success' v-else>Siguiente</button>
    </div>
  </form>
</template>
<script>
  import productAttrVariant from '@/components/product/productAttrVariant'
  export default {
    name: 'productPaso2',
    components: {
      productAttrVariant
    },
    data () {
      return {
        load: false,
        product: {
          family: '',
          is_variation: false,
          attribute: []
        },
        name: '',
        families: [],
        attributes_variations: []
      }
    },
    created () {
      this.getFamilies()
      this.getProduct()
    },
    methods: {
      updateAttributeId () {
        this.$store.dispatch('updateAttrAttributes', this.product.attribute)
      },
      productAttributes (productAttributes) {
        this.product.product_class_products = productAttributes
      },
      getFamilies () {
        var self = this
        this.axios.get('/family/family/', {
          params: {
            fields: 'id,name'
          }
        }).then(response => {
          self.families = response.data.results
        })
      },
      changeVariation (e) {
        if (!e.target.checked) {
          this.product.attribute = []
          this.$store.dispatch('updateAttrAttributes', this.product.attribute)
        }
      },
      getAttributesVariation () {
        const self = this
        this.$store.dispatch('updatefamilyGroupAttr', this.product.family)
        this.axios.get('/product/product-attributes/', {
          params: {
            fields: 'id,name',
            family: self.product.family
          }
        }).then(response => {
          self.product.is_variation = false
          self.product.attribute = []
          self.attributes_variations = response.data
        })
      },
      getProduct () {
        var self = this
        this.axios({
          method: 'get',
          url: '/product/product-paso-1/' + self.$route.params.id + '/'
        }).then(response => {
          self.name = response.data.name
        })
      }
    }
  }
</script>