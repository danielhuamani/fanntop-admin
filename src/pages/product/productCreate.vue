<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Producto</h3>
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
              <input type="text" v-model="product.name" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Descripción</label>
              <VueCkeditor language='es' v-model="product.description"></VueCkeditor>
            </div>
          </div>

        </div>
        <div class="col-4 second_element">
          <div class="row  material content">
            <div class="col-12 content__field">
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
            </div>
            <div class="col-12 content__field">
              <label for="">Influenciador</label>
              <select  class="custom-select" v-model='product.influencer'>
                <option value=""  >Seleccione influenciador</option>
                <option v-for="influencer in influencers" :value="influencer.id">{{influencer.name}}</option>
              </select>
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
              <input type="text" v-model="product.title" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Meta Description</label>
              <input type="text" v-model="product.meta_description" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Url</label>
              <input type="text" v-model="product.slug" class="form-control">
              <p class="content__seo text-primary">{{product.slug | slugify}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueCkeditor from 'vueckeditor'
  export default {
    name: 'categoryCreate',
    components: {
      VueCkeditor
    },
    data () {
      return {
        product: {
          id: null,
          name: '',
          description: '',
          image: '',
          title: '',
          meta_description: '',
          slug: '',
          category: '',
          influencer: ''
        },
        fileImage: '',
        formData: new FormData(),
        categories: [],
        influencers: []

      }
    },
    created () {
      this.getInfluencers()
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
        this.axios({
          method: 'post',
          url: '/category/',
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
      }

    },
    computed: {

    }
  }
</script>
