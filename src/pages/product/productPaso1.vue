<template>
  <form @submit.prevent="saveProduct()" class="d-flex material content_paso content position-relative">
    <div class="col-12 ">
      <h5 class="material__title">Información Basica</h5>
      <div class="row">
        <div class="col-8">
          <div class="row">
            <div class="col-12 content__field">
              <label for="">Nombre</label>
              <input name="name" type="text" v-validate="'required|alpha_spaces'" :class="{'input': true, 'form-control--error': errors.has('name') }"  class="form-control" v-model='product.name'>
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
        <div class="col-4">
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

        </div>
      </div>
      <div class="row">
      </div>
    </div>
    <div class="d-flex justify-content-end next_page">
      <div class="btn btn-success" v-if='load'>
        <div class="loader_btn" ></div>
      </div>
      <button  class='btn btn-success' v-else>Siguiente</button>
    </div>
  </form>
</template>
<script>
  import VueCkeditor from 'vueckeditor'
  export default {
    name: 'productPaso1',
    components: {
      VueCkeditor
    },
    data () {
      return {
        load: false,
        product: {
          description: '',
          characteristics: '',
          id: null,
          name: '',
          category: [],
          influencer: ''
        },
        influencers: [],
        categories: []
      }
    },
    created () {
      this.getInfluencers()
      this.getCategories()
    },
    methods: {
      saveProduct (scope) {
        var self = this
        self.load = true
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.axios({
              method: 'post',
              url: '/product/product-paso-1/',
              data: self.product
            }).then(response => {
              self.load = false
              self.$router.push({name: 'product_paso_2', params: { id: response.data.id }})
            }).catch(error => {
              console.log('err', error)
              self.load = false
            })
          } else {
            self.load = false
            console.log('error')
          }
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
      addCategoryParent (e, idCategoryParent) {
        if (e.target.checked) {
          if (this.product.category.indexOf(idCategoryParent) === -1) {
            this.product.category.push(idCategoryParent)
          }
        }
      }
    }
  }
</script>
<style lang='scss'>
  .content_paso{
    padding-bottom: 80px !important;
  }
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
</style>