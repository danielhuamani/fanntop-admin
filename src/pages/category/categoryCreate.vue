<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nueva Categoria</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'category'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <a href="" class="btn btn-success btn-save" @click.prevent="saveCategory">
          <i class="fa fa-save"></i>
          Guardar
        </a>
      </div>
      <div class="d-flex  ">
        <div class="col-8 ">
          <div class="row material content">
            <div class="col-12 content__field">
              <label for="">Nombre</label>
              <input type="text" v-model="category.name" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Imagen</label>
              <div class="content__image">
                <label class="custom-file content__file">
                <input type="file" id="file" class="custom-file-input content__file__input"  @change="fileUpload">
                <span class="custom-file-control content__file__control">
                  <img :src="fileImage" alt="" width="225" height="225">
                </span>
                </label>
              </div>
            </div>

          </div>

        </div>
        <div class="col-4 second_element">
          <div class="row  material content">
            <div class="col-12 content__field content__field--check">
              <label for="">¿Activo?</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model="category.is_active" />
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Posición</label>
              <input type="text" v-model="category.position" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Categoria</label>
              <div class="category_content">
                <div class="custom-control custom-radio">
                  <input id='default' type="radio" class="custom-control-input" name="category" v-model="category.category" value="">
                  <label for='default' class="custom-control-label">Default</label>
                </div>
                <div class="category_content__first" v-for="category_first in categories">
                  <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input"
                     v-model="category.category" :id="'category_first' + category_first.id" :value="category_first.id">
                    <label class="custom-control-label" :for="'category_first' + category_first.id">{{category_first.name}}</label>
                  </div>
                  <div class="category_content__second custom-control custom-radio" v-for="category_second in category_first.category_categories">
                    <input type="radio" class="custom-control-input"
                     :id="'category_second' + category_first.id" disabled>
                    <label class="custom-control-label" :for="'category_second' + category_second.id">{{category_second.name}}</label>
                  </div>
                </div>

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
              <input type="text" v-model="category.title" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Meta Description</label>
              <input type="text" v-model="category.meta_description" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Url</label>
              <input type="text" v-model="category.slug" class="form-control">
              <p class="content__seo text-primary">{{category.slug | slugify}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .category_content{
    &__first{
      margin-left:15px;
    }
    &__second{
      margin-left:30px;
    }
  }
</style>
<script>
  import VueCkeditor from 'vueckeditor'
  import categorySelect from './categorySelect'
  export default {
    name: 'categoryCreate',
    components: {
      VueCkeditor,
      categorySelect
    },
    data () {
      return {
        category: {
          id: null,
          name: '',
          description: '',
          image: '',
          title: '',
          meta_description: '',
          slug: '',
          category: null,
          is_active: false
        },
        categoryName: '',
        fileImage: '',
        formData: new FormData(),
        categories: []
      }
    },
    created () {
      this.getCategories()
      // this.initialGetCategory(2, categories.data)
      // this.loadCategoryInitial()
    },
    mounted () {

    },
    methods: {
      fileUpload (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        return this.createImage(files[0])
      },
      createImage (file) {
        var reader = new FileReader()
        var vm = this

        reader.onload = (e) => {
          vm.fileImage = reader.result
        }
        reader.readAsDataURL(file)
        this.formData.append('image', file)
      },
      saveCategory () {
        var self = this
        self.formData.append('id', this.category.id)
        self.formData.append('name', this.category.name)
        self.formData.append('description', this.category.description)
        self.formData.append('title', this.category.title)
        self.formData.append('meta_description', this.category.meta_description)
        self.formData.append('slug', this.category.slug)
        self.formData.append('is_active', this.category.is_active)
        self.formData.append('position', this.category.position)
        self.formData.append('position', this.category.category)
        this.axios({
          method: 'post',
          url: '/category/category/',
          data: self.formData
        }).then(response => {
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
          self.$router.push({name: 'category_update', params: { id: response.data.id }})
        }).catch(error => {
          let status = ''
          if (error.response.status >= 400 && error.response.status < 500) {
            status = 'danger'
          }
          this.$emit('alert', status, error.response.data)
        })
      },
      getCategories () {
        var self = this
        this.axios({
          method: 'get',
          url: '/category/category_list/',
          params: {
            fields: 'id,name,category_categories'
          }
        }).then(response => {
          self.categories = response.data
        })
      }
      // deleteCategory (pos, nivelCategory) {
      //   nivelCategory = parseInt(nivelCategory)
      //   var totalDelete = pos - nivelCategory
      //   for (var i = 1; i <= totalDelete; i++) {
      //     this.$delete(this.list_category, i + nivelCategory)
      //   }
      //   this.position = nivelCategory
      // },
      // loadCategoryInitial () {
      //   var self = this
      //   if (self.levels_category.length > 0) {
      //     self.levels_category.forEach(function (val) {
      //       self.position = self.position + 1
      //       var pos = self.position
      //       this.axios.get('/category/', {
      //         params: {
      //           category: val
      //         }
      //       })
      //       .then((res) => {
      //         if (res.data.length > 0) {
      //           self.initialGetCategory(pos, res.data)
      //         }
      //       })
      //     })
      //   }
      // },
      // initialGetCategory (pos, data) {
      //   this.$set(this.list_category, pos, data)
      // },
      // updateCategory (pos, nivelCategory, data) {
      //   nivelCategory = parseInt(nivelCategory)
      //   var totalDelete = pos - nivelCategory
      //   for (var i = 1; i <= totalDelete; i++) {
      //     this.$delete(this.list_category, i + nivelCategory)
      //   }
      //   this.position = nivelCategory + 1
      //   this.$set(this.list_category, this.position, data)
      // },
      // loadCategory (value, nivelCategory, model) {
      //   var self = this
      //   self.category.category = model
      //   if (value) {
      //     this.category_value_initial = value
      //     this.axios.get('/category/', {
      //       params: {
      //         category: value
      //       }
      //     })
      //     .then(res => {
      //       if (res.data.length > 0) {
      //         self.updateCategory(self.position, nivelCategory, res.data)
      //       } else {
      //         this.deleteCategory(self.position, nivelCategory)
      //       }
      //     })
      //   } else {
      //     this.deleteCategory(self.position, nivelCategory)
      //   }
      // }
    }
  }
</script>
