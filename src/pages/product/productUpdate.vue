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
              </div>
            </div>
            <div class="col-12 material content variations">
              <h5 class="material__title">Product Variante</h5>
              <div class="row variations__header">
                <div class="col-1">
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
              <div class="row variations__body align-items-center" v-for='productVariant in product.product_class_products'>
                <div class="col-1">
                  <label class="custom-control custom-radio" >
                    <span class="custom-control-indicator" :class="{ 'variations__body__active': productVariant.is_active }"></span>
                  </label>
                </div>
                <div class="col-3">
                  <router-link :to="{ name: 'product_variant_update', params: { id: product.id, id_variant_update: productVariant.id }}"  class="table__body__link">
                    <h4 class="variations__body__title"  v-for="product in productVariant.attribute_option">{{product.name_attr}}: {{product.option}}</h4>
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
                  <label class="custom-control custom-radio" >
                    <span class="custom-control-indicator" :class="{ 'variations__body__active': productVariant.is_featured }"></span>
                  </label>
                </div>
              </div>
            </div>
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
                  <input type="checkbox" :value="variation.id" class="custom-control-input" v-model="product.attribute">
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
  import VueCkeditor from 'vueckeditor'
  import productMixin from '@/mixins/productMixin'
  import productInfo from '@/components/product/productInfo'
  export default {
    name: 'productUpdate',
    components: {
      VueCkeditor,
      productInfo
    },
    mixins: [productMixin],
    data () {
      return {
        product: {
          id: null,
          name: '',
          description: '',
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
        }
      }
    },
    created () {
      this.getInfluencers()
      this.getCategories()
      this.getFamilies()
      this.getProduct()
    },
    methods: {
      getProduct () {
        var self = this
        this.axios({
          method: 'get',
          url: '/product/product/' + self.$route.params.id + '/'
        }).then(response => {
          self.product = response.data
          self.getAttributesVariation()
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
</style>