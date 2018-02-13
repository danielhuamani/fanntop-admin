<template>
  <form @submit.prevent="saveProduct()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Producto</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'category'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
      <div class="d-flex  ">
        <div class="col-8 ">
          <div class="row  ">
            <div class="col-12 material content">
              <h5 class="material__title">Informacion Basica</h5>
              <div class="row">
                <div class="col-12 content__field">
                  <label for="">Nombre</label>
                  <input name="name" type="text" v-model="product.name" v-validate="'required|alpha_spaces'" :class="{'input': true, 'form-control--error': errors.has('name') }"    class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Descripción</label>
                  <VueCkeditor height='140' language='es' v-model="product.description"></VueCkeditor>
                </div>
                <div class="col-12 content__field">
                  <label for="">Caracteristicas</label>
                  <VueCkeditor height='140' language='es' v-model="product.characteristics"></VueCkeditor>
                </div>
              </div>
            </div>
            <productAttrVariant v-if="product.attribute.length > 0" v-on:productAttributes='productAttributes' :is_variation="product.is_variation" :attribute_ids='product.attribute'>
            </productAttrVariant v-if="product.family" :family_id="product.family">
            <!-- <productVariant>
            </productVariant> -->
            <productInfo v-if="product.family" :family_id="product.family">
            </productInfo>
          </div>

        </div>
        <div class="col-4 second_element">
          <div class="row  material content">
           <!--  <div class="col-12 content__field">
              <label for="">¿Activo?</label>
              <div class="checkbox">
                <label class="label">
                  <input  class="label__checkbox" v-model="product.is_active" type="checkbox" />
                  <span class="label__text">
                    <span class="label__check">
                      <i class="fa fa-check icon"></i>
                    </span>
                  </span>
                </label>
              </div>
            </div> -->
            <div class="col-12 content__field">
              <label for="">Influenciador</label>
              <select  name="influencer"  v-validate="'required'" class="custom-select" :class="{'input': true, 'form-control--error': errors.has('influencer') }" v-model='product.influencer'>
                <option value=""  >Seleccione influenciador</option>
                <option v-for="influencer in influencers" :value="influencer.id">{{influencer.name}}</option>
              </select>
            </div>
            <div class="col-12 content__field">
              <label for="">Categoria</label>
              <select name="category" v-validate="'required'" :class="{'input': true, 'form-control--error': errors.has('category') }" class="custom-select" v-model='product.category' multiple>
                <option value=""  >Seleccione Categoria</option>
                <option v-for="category in categories" :value="category.id">{{category.name}}</option>
              </select>
            </div>
            <div class="col-12 content__field">
              <label for="">Grupo de Atributo</label>
              <select  name="family" v-validate="'required'" :class="{'input': true, 'form-control--error': errors.has('family') }"  class="custom-select" v-model='product.family' @change="getAttributesVariation" >
                <option value=""  >Seleccione Grupo</option>
                <option v-for="family in families" :value="family.id">{{family.name}}</option>
              </select>
            </div>
            <div class="col-12 content__field">

              <label class="custom-control custom-checkbox">
                <input type="checkbox" v-model="product.is_variation" class="custom-control-input">
                <span class="custom-control-indicator"></span>
                ¿Variacion?
              </label>
            </div>
            <div class="col-12 content__field" v-if="product.is_variation">

              <div class="" v-for="variation in attributes_variations">
                <label class="custom-control custom-checkbox">
                  <input type="checkbox" :value="variation.id" class="custom-control-input" @change="updateAttributeId" v-model="product.attribute">
                  <span class="custom-control-indicator"></span>
                  {{variation.name}}
                </label>
              </div>


            </div>
          </div>
        </div>

      </div>
      <div class="d-flex material content">
        <div class="col-12">
          <h4 class="material__title">Seo</h4>
          <div class="row">
            <div class="col-12 content__field">
              <label for="">Title</label>
              <input type="text" name="title" v-validate="'required'" :class="{'input': true, 'form-control--error': errors.has('title') }"  v-model="product.title" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Meta Description</label>
              <input type="text" v-model="product.meta_description" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Url</label>
              <input type="text" name="slug" v-validate="'required'" :class="{'input': true, 'form-control--error': errors.has('slug') }" v-model="product.slug" class="form-control">
              <p class="content__seo text-primary">{{product.slug | slugify}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import productAttrVariant from '@/components/product/productAttrVariant'
  import productVariant from '@/components/product/productVariant'
  import productInfo from '@/components/product/productInfo'
  import VueCkeditor from 'vueckeditor'
  // import spanish from 'vee-validate/dist/locale/es'
  export default {
    name: 'ProductCreate',
    components: {
      VueCkeditor,
      productAttrVariant,
      productInfo,
      productVariant
    },
    data () {
      return {
        product: {
          id: null,
          name: '',
          description: '',
          characteristics: '',
          title: '',
          meta_description: '',
          slug: '',
          category: [],
          influencer: '',
          family: '',
          attribute: [],
          is_variation: false,
          is_published: false,
          product_class_products: [],
          product_class_product_attr_value: []
        },
        categories: [],
        influencers: [],
        families: [],
        attributes_variations: []

      }
    },
    created () {
      this.getInfluencers()
      this.getCategories()
      this.getFamilies()
    },
    mounted () {
      this.product_class_product_attr_value = this.$store.getters.productClassAttrValue
    },
    methods: {
      updateAttributeId () {
        this.$store.dispatch('updateAttrAttributes', this.product.attribute)
      },
      getInfluencers () {
        var self = this
        this.axios.get('/influencer', {
          params: {
            fields: 'id,name'
          }
        }).then(response => {
          self.influencers = response.data
        })
      },
      getCategories () {
        var self = this
        this.axios.get('/category', {
          params: {
            fields: 'id,name'
          }
        }).then(response => {
          self.categories = response.data
        })
      },
      getFamilies () {
        var self = this
        this.axios.get('/family/family/', {
          params: {
            fields: 'id,name'
          }
        }).then(response => {
          self.families = response.data
        })
      },
      saveProduct (scope) {
        var self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.product.product_class_product_attr_value = self.$store.getters.productClassAttrValue
            self.axios({
              method: 'post',
              url: '/product/product/',
              data: self.product
            }).then(response => {
              console.log(response, 'response')
            }).catch(error => {
              console.log('err', error)
            })
          } else {
            console.log('error')
          }
        })
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
          self.attributes_variations = response.data
        })
      },
      productAttributes (productAttributes) {
        console.log(productAttributes, 'productAttributes')
        this.product.product_class_products = productAttributes
      }

    }
  }
</script>
