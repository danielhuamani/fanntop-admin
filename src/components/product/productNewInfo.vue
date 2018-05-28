<template>
  <form action='' class='row' @submit.prevent="saveProduct()" >
    <div class="col-12">
      <div class="page__header content material d-flex  justify-content-end">
        <router-link :to="{ name: 'category'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
      <div class="d-flex">
        <div class="col-8">
          <div class="row material content">
            <div class="col-12 ">
              <h5 class="material__title">Informacion Basica</h5>
              <div class="row">
                <div class="col-12 content__field">
                  <label for="">Nombre</label>
                  <input name="name" type="text" v-model="product.name" v-validate="'required|alpha_spaces'" :class="{'input': true, 'form-control--error': errors.has('name') }"    class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Descripción</label>
                  <VueCkeditor height='140' v-validate="'required'" name="description" :class="{'form-control--error': errors.has('description') }" language='es' v-model="product.description"></VueCkeditor>
                </div>
                <div class="col-12 content__field">
                  <label for="">Carateristicas</label>
                  <VueCkeditor height='140' language='es' v-validate="'required'" name="characteristics" :class="{'form-control--error': errors.has('characteristics') }" v-model="product.characteristics"></VueCkeditor>
                </div>
              </div>
            </div>
          </div>
          <div class="row  material content" >
            <div class="col-12 specifications">
              <h5 class="material__title">Especificaciones</h5>
              <div class="row specifications__attr align-items-center"  v-if="!attr.is_variation" v-for="attr in getFamilyAttr">
                <div class="col-4">
                  <h6 class="specifications__sub_title">{{attr.name_attr}}</h6>
                </div>
                <div class="col-8">
                  <component :is="getTypeAttr(attr)" :valueAttr='getTypeAttrValue(attr)' :valueId='getTypeAttrId(attr)' :nameValidate='attr.name_attr'  :id_attr='attr.attribute'>

                  </component>
                  <!-- v-if="!attr.is_variation" v-for="attr in getFamilyAttr" -->
                </div>
              </div>
            </div>
          </div>
          <div class="row material content">
            <div class="col-12">
              <h4 class="material__title">Seo</h4>
              <div class="row">
                <div class="col-12 content__field">
                  <label for="">Title</label>
                  <input type="text"  name="title" v-validate="'required'" :class="{'form-control--error': errors.has('title') }"  v-model="product.title" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Meta Description</label>
                  <input type="text" v-model="product.meta_description" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Url</label>
                  <input type="text" name="slug" v-validate="'required'" :class="{'form-control--error': errors.has('slug') }" v-model="product.slug" class="form-control">
                  <p class="content__seo text-primary">{{product.slug | slugify}}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="col-4 second_element">
          <div class="row  material content">
            <div class="col-12 content__field content__field--check" >
              <label for="">Publicar</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="2"  v-model="product.is_published" />
                <label class="label" for="2">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Influenciador</label>
              <select  name="influencer"  v-validate="'required'" class="custom-select" :class="{'input': true, 'form-control--error': errors.has('influencer') }" v-model='product.influencer'>
                <option value=""  >Seleccione influenciador</option>
                <option v-for="influencer in influencers" :value="influencer.id">{{influencer.name}}</option>
              </select>
            </div>
            <div class="col-12 content__field">
              <label for="">Categoria</label>
              <div class="product_category" :class="{'product_category--error': errors.has('category') }">
                <div class="product_category__first"  v-for="category_first in categories">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :value="category_first.id" :id="'category_' + category_first.id" name="category" v-model="product.category" >
                    <label class="custom-control-label" :for="'category_' + category_first.id">{{category_first.name}}</label>
                  </div>
                  <div class="product_category__second" v-for="category_second in category_first.category_categories">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" @change="addCategoryParent($event, category_first.id)"  v-model="product.category" :id="'category_second' + category_second.id" :value="category_second.id">
                      <label class="custom-control-label" :for="'category_second' + category_second.id">{{category_second.name}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Grupo de Atributo</label>
              <span>{{product.family_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { EventBus } from '@/bus'
  import productInfoInput from './productInfoInput'
  import productInfoSelect from './productInfoSelect'
  import VueCkeditor from 'vueckeditor'
  export default {
    name: 'productNewInfo',
    components: {
      VueCkeditor,
      productInfoInput,
      productInfoSelect
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
          product_class_product_attr_value: [],
          family_name: '',
          is_published: false
        },
        categories: [],
        influencers: [],
        familyAttrs: []
      }
    },
    created () {
      this.getInfluencers()
      this.getCategories()
      this.getProductClass()
    },
    methods: {
      getProductClass () {
        var self = this
        this.axios({
          method: 'get',
          url: '/product/product/' + self.$route.params.id + '/',
          params: {
            'fields!': 'product_class_products'
          }
        }).then(response => {
          let data = response.data
          self.product.id = data.id
          self.product.name = data.name
          self.product.description = data.description
          self.product.characteristics = data.characteristics
          self.product.title = data.title
          self.product.meta_description = data.meta_description
          self.product.slug = data.slug
          self.product.category = data.category
          self.product.influencer = data.influencer
          self.product.product_class_product_attr_value = data.product_class_product_attr_value
          self.product.family_name = data.family_name
          self.product.is_published = data.is_published
          self.$store.dispatch('updatefamilyGroupAttr', data.family)
        })
      },
      getInfluencers () {
        var self = this
        this.axios.get('/influencer', {
          params: {
            fields: 'id,name'
          }
        }).then(response => {
          self.influencers = response.data.results
        })
      },
      getCategories () {
        var self = this
        this.axios.get('/category/category/', {
          params: {
            fields: 'id,name,category_categories',
            category: true
          }
        }).then(response => {
          self.categories = response.data.results
        })
      },
      getTypeAttr (typeAttr) {
        var typeComponent = ''
        switch (typeAttr.type_name) {
          case 'INPUT':
            typeComponent = 'productInfoInput'
            break
          case 'SELECT_SINGLE':
            typeComponent = 'productInfoSelect'
            break
        }
        return typeComponent
      },
      getTypeAttrId (attr) {
        let valueId = ''
        let productAttrValue = this.product.product_class_product_attr_value.filter(function (val) {
          if (val.attribute === attr.attribute) {
            return true
          }
        })
        if (productAttrValue.length > 0) {
          valueId = productAttrValue[0]['id']
        }
        return valueId
      },
      getTypeAttrValue (attr) {
        let typeAttr = ''
        let value = ''
        switch (attr.type_name) {
          case 'INPUT':
            typeAttr = 'value_input'
            break
          case 'SELECT_SINGLE':
            typeAttr = 'value_option'
            break
        }
        let productAttrValue = this.product.product_class_product_attr_value.filter(function (val) {
          if (val.attribute === attr.attribute) {
            return true
          }
        })
        if (productAttrValue.length > 0) {
          value = productAttrValue[0][typeAttr]
        }
        return value
      },
      addCategoryParent (e, idCategoryParent) {
        if (e.target.checked) {
          if (this.product.category.indexOf(idCategoryParent) === -1) {
            this.product.category.push(idCategoryParent)
          }
        }
      },
      saveProduct (scope) {
        var self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.product.product_class_product_attr_value = self.$store.getters.productClassAttrValueUpdate
            console.log(self.$store.getters.productClassAttrValueUpdate, '----')
            self.axios({
              method: 'PATCH',
              url: '/product/product/' + self.product.id + '/',
              data: self.product,
              params: {
                'fields!': 'product_class_products'
              }
            }).then(response => {
              self.product.product_class_product_attr_value = response.data.product_class_product_attr_value
              EventBus.$emit('alert', 'success', {'Se guardo correctamente': []})
              self.$router.push({name: 'product_update', params: { id: response.data.id }})
            }).catch(error => {
              let status = ''
              if (error.response.status >= 400 && error.response.status < 500) {
                status = 'danger'
              }
              EventBus.$emit('alert_bus', status, error.response.data)
            })
          } else {
            console.log('error')
          }
        })
      }
    },
    computed: {
      getFamilyAttr () {
        return this.$store.getters.familyGroupAttr
      }
    }
  }
</script>
<style lang="scss">
  @import "~styles/abstract/variables";
  .product_category{
    border: 1px solid #ced4da;
    padding: 10px 0;
    border-radius: 5px;
    height: 220px;
    overflow-y: scroll;
    &--error{
      border: 1px solid #d9534f;
    }
    &__first{
      margin-left:15px;
    }
    &__second{
      margin-left: 30px;
    }
  }
  .specifications{
    &__title{
      font-size: 18px;

    }
    &__attr{
      margin-left: 0px;
      margin: 8px 0;
    }
    &__sub_title{
      font-size: 15px;
      margin-bottom: 0;
      color: $color-table-link

    }
    &__title:last-child{
      margin-top: 15px;
    }
  }
</style>