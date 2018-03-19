<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nueva Categoria</h3>
      <div class="page__header material d-flex  justify-content-end">
        <a href="" class="btn btn-secondary btn-cancel" @click.prevent="goBack">
          <i class="fa fa-undo-alt"></i>
          Regresar
        </a>
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
              <input type="text" v-model="home.name" class="form-control">
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
                  <input  class="label__checkbox" v-model="home.is_active" type="checkbox" />
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
              <input type="text" v-model="home.position" class="form-control">
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'homeCreate',
    components: {
    },
    data () {
      return {
        home: {
          id: null,
          name: '',
          image: '',
          is_active: false,
          position: 0
        },
        fileImage: '',
        formData: new FormData()
      }
    },
    created () {
      this.getHomeBanner()
    },
    mounted () {

    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
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
      getHomeBanner () {
        const self = this
        const id = this.$route.params.id
        this.axios.get('/pages/home/' + id + '/', {
          params: self.params
        }).then(response => {
          self.home = response.data
          self.fileImage = response.data.image
          // self.formData.append('image', response.data.image)
        })
      },
      saveCategory () {
        const id = this.$route.params.id
        const self = this
        self.formData.append('id', this.home.id)
        self.formData.append('name', this.home.name)
        self.formData.append('is_active', this.home.is_active)
        self.formData.append('position', this.home.position)
        this.axios({
          method: 'PATCH',
          url: '/pages/home/' + id + '/',
          data: self.formData
        }).then(response => {
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
          self.$router.push({name: 'home_update', params: { id: response.data.id }})
        }).catch(error => {
          let status = ''
          if (error.response.status >= 400 && error.response.status < 500) {
            status = 'danger'
          }
          this.$emit('alert', status, error.response.data)
        })
      }
    }

  }
</script>
