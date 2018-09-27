<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Banner {{home.name}}</h3>
      <div class="page__header material d-flex  justify-content-between">
        <a href="" @click.prevent='modal.show=true' class='btn btn-danger '><i class='far fa-trash-alt'></i> Eliminar</a>
        <div class="button-group">
          <router-link :to="{ name: 'home'}" class="btn btn-secondary btn-cancel">
            <i class="fa fa-undo-alt"></i>
            Cancelar
          </router-link>
          <a href="" class="btn btn-success btn-save" @click.prevent="saveCategory">
            <i class="fa fa-save"></i>
            Guardar
          </a>
        </div>
      </div>
      <div class="d-flex  ">
        <div class="col-8 ">
          <div class="row material content">
            <div class="col-12 content__field">
              <label for="">Nombre</label>
              <input type="text" v-model="home.name" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Url</label>
              <input type="text" v-model="home.url" class="form-control">
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
      <modalDelete :modal='modal' @close='close'></modalDelete>
    </div>
  </div>
</template>
<script>
  import modalDelete from '@/componentsGlobals/modalDelete'
  export default {
    name: 'homeCreate',
    components: {
      modalDelete
    },
    data () {
      return {
        modal: {
          show: false,
          message: '',
          url: '',
          urlRedirect: 'home'
        },
        home: {
          id: null,
          name: '',
          image: '',
          is_active: false,
          position: 0,
          url: ''
        },
        fileImage: '',
        formData: new FormData()
      }
    },
    created () {
      this.getHomeBanner()
      this.modal.url = '/pages/home/' + this.$route.params.id + '/'
    },
    mounted () {

    },
    methods: {
      close () {
        this.modal.show = false
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
          self.modal.message = response.data.name
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
        self.formData.append('url', this.home.url)
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
