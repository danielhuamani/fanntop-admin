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
            <div class="col-12 content__field">
              <label for="">¿Activo?</label>
              <div class="checkbox">
                <label class="label">
                  <input  class="label__checkbox" v-model="category.is_active" type="checkbox" />
                  <span class="label__text">
                    <span class="label__check">
                      <i class="fa fa-check icon"></i>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Posición</label>
              <input type="text" v-model="category.position" class="form-control">
            </div>
            <div class="col-12 content__field">
              <category-select-update v-on:load_category="loadCategory" :levels_category="levels_category" :category_value="category_value_initial" :data_category="categoryData"></category-select-update>
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
<script>
  import VueCkeditor from 'vueckeditor'
  import categorySelectUpdate from './categorySelectUpdate'
  export default {
    name: 'categoryUpdate',
    components: {
      VueCkeditor,
      categorySelectUpdate
    },
    data () {
      return {
        category: {
          id: '',
          name: '',
          description: '',
          image: '',
          title: '',
          meta_description: '',
          slug: '',
          category: ''
        },
        categoryName: '',
        fileImage: '',
        formData: new FormData(),
        categories: [],
        category_initial: [],
        category_value_initial: null,
        levels_category: [],
        list_category: {},
        position: 2
      }
    },
    created () {
      this.getCategories()
      this.getCategory()
      // this.initialGetCategory(2, categories.data)
      // this.loadCategoryInitial()
    },
    mounted () {
      console.log(this.$route.params.id, 'id')
      this.category_value_initial = this.$route.params.id
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
        console.log(self.formData)
        this.axios({
          method: 'PATCH',
          url: '/category/' + this.$route.params.id + '/',
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
            fields: 'id,name'
          }
        }).then(response => {
          self.initialGetCategory(2, response.data)
        })
      },
      getCategory () {
        var self = this
        this.axios({
          method: 'get',
          url: '/category/' + self.$route.params.id + '/'

        }).then(response => {
          self.category = response.data
          self.fileImage = response.data.image
          self.levels_category = response.data.levels_category
          self.loadCategoryInitial()
          // self.initialGetCategory(2, response.data)
        })
      },
      deleteCategory (pos, nivelCategory) {
        nivelCategory = parseInt(nivelCategory)
        var totalDelete = pos - nivelCategory
        for (var i = 1; i <= totalDelete; i++) {
          this.$delete(this.list_category, i + nivelCategory)
        }
        this.position = nivelCategory
      },
      loadCategoryInitial () {
        var self = this
        console.log(self.levels_category.length, '232')
        if (self.levels_category.length > 0) {
          self.levels_category.forEach(function (val) {
            self.position = self.position + 1
            var pos = self.position
            self.axios.get('/category/category_list/', {
              params: {
                category: val,
                fields: 'id,name'
              }
            })
            .then((res) => {
              if (res.data.length > 0) {
                self.initialGetCategory(pos, res.data)
              }
            })
          })
        }
      },
      initialGetCategory (pos, data) {
        this.$set(this.list_category, pos, data)
      },
      updateCategory (pos, nivelCategory, data) {
        nivelCategory = parseInt(nivelCategory)
        var totalDelete = pos - nivelCategory
        for (var i = 1; i <= totalDelete; i++) {
          this.$delete(this.list_category, i + nivelCategory)
        }
        this.position = nivelCategory + 1
        this.$set(this.list_category, this.position, data)
      },
      loadCategory (value, nivelCategory, model) {
        var self = this
        self.category.category = model
        if (value) {
          this.category_value_initial = value
          this.axios.get('/category/category_list/', {
            params: {
              category: value
            }
          })
          .then(res => {
            if (res.data.length > 0) {
              self.updateCategory(self.position, nivelCategory, res.data)
            } else {
              this.deleteCategory(self.position, nivelCategory)
            }
          })
        } else {
          this.category_value_initial = value
          this.deleteCategory(self.position, nivelCategory)
        }
      }
    },
    computed: {
      categoryData () {
        return this.list_category
      }
    }
  }
</script>
