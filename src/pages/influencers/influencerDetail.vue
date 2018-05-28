<template>

  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Influenciador {{influencerName}}</h3>
      <div class="page__header material d-flex  justify-content-between">
      <a href="" @click.prevent='modal.show=true' class='btn btn-danger '><i class='far fa-trash-alt'></i> Eliminar</a>
      <div class="button-group">
        <a href=""  class="btn btn-secondary btn-cancel" @click.prevent="goBack">
          <i class="fa fa-undo-alt"></i>
          Regresar
        </a>
        <a href="" class="btn btn-success btn-save" @click.prevent="saveInfluencer">
          <i class="fa fa-save"></i>
          Guardar
        </a>
      </div>
      </div>
      <div class="d-flex material content">
        <div class="col-12">
          <div class="row">
            <div class="col-2 content__field">
              <label for="">Activo</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1"  v-model="influencer.is_active" />
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-4 content__field">
              <label for="">Poisción</label>
              <input type="text" v-model="influencer.position" class="form-control">
            </div>
            <div class="col-6 content__field">
              <label for="">Nombre</label>
              <input type="text" v-model="influencer.name" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Descripción</label>
              <VueCkeditor language='es' v-model="influencer.description"></VueCkeditor>
            </div>
            <div class="col-12 content__field">
              <label for="">Imagen</label>
              <div class="content__image custom-file">
                <input type="file" id="file" class="custom-file-input content__file__input"  @change="fileUpload($event, 'image')" lang="es">
                <label class="custom-file-label content__file">
                </label>
                <span class="custom-file-control content__file__control">
                  <img :src="fileImage" alt="" width="225" height="225">
                </span>
              </div>

            </div>
            <div class="col-12 content__field">
              <label for="">Banner</label>
              <div class="content__image custom-file">
                <input type="file" id="file_banner" class="custom-file-input content__file__input"  @change="fileUpload($event, 'banner')" lang="es">
                <label class="custom-file-label content__file">
                </label>
                <span class="custom-file-control content__file__control">
                  <img :src="fileImageBanner" alt="" width="225" height="225">
                </span>
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
              <input type="text" v-model="influencer.title" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Meta Description</label>
              <input type="text" v-model="influencer.meta_description" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Url</label>
              <input type="text" v-model="influencer.slug" class="form-control">
              <p class="content__seo text-primary">{{influencer.slug | slugify}}</p>
            </div>
          </div>
        </div>
      </div>
  <!--     <attribute-modal v-if="showAttributeModal" :show="showAttributeModal"
    @close="showAttributeModal = false" :idModalAttributeOption='idModalAttributeOption'
    :urlAttributeOption='urlAttributeOption' @reloadAttributeOption='reloadAttributeOption'>
    </attribute-modal> -->
      <modalDelete :modal='modal' @close='close'></modalDelete>
    </div>
  </div>
</template>
<script>
  import modalDelete from '@/componentsGlobals/modalDelete'
  import VueCkeditor from 'vueckeditor'
  export default {
    name: 'influencerDetail',
    components: {
      VueCkeditor,
      modalDelete
    },
    data () {
      return {
        modal: {
          show: false,
          message: '',
          url: '',
          urlRedirect: 'influencer'
        },
        influencer: {
          id: null,
          name: '',
          description: '',
          image: '',
          title: '',
          meta_description: '',
          slug: '',
          banner: ''
        },
        influencerName: '',
        fileImage: '',
        fileImageBanner: '',
        formData: new FormData()
      }
    },
    created () {
      this.modal.url = '/influencer/' + this.$route.params.id + '/'
      this.getInfluencer()
    },
    mounted () {

    },
    methods: {
      close () {
        this.modal.show = false
      },
      fileUpload (e, typeImage) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        // console.log(files[0])
        // var x = files[0]
        return this.createImage(files[0], typeImage)
      // return new Buffer(x)
      },
      createImage (file, typeImage) {
      // var image = new Image()
        var reader = new FileReader()
        var vm = this

        reader.onload = (e) => {
          // vm.image = e.target.result
          if (typeImage === 'image') {
            vm.fileImage = reader.result
          }
          if (typeImage === 'banner') {
            vm.fileImageBanner = reader.result
          }
        }
        reader.readAsDataURL(file)
        this.formData.append(typeImage, file)
      },
      getInfluencer () {
        var self = this
        var id = this.$route.params.id
        this.axios.get('/influencer/' + id + '/', {
          params: self.params
        }).then(response => {
          self.influencer = response.data
          self.influencerName = response.data.name
          self.fileImage = response.data.image
          self.fileImageBanner = response.data.banner
          self.modal.message = response.data.name
          // self.formData.append('image', response.data.image)
        })
      },
      goBack () {
        this.$router.go(-1)
      },
      saveInfluencer () {
        var id = this.$route.params.id
        var self = this
        self.formData.append('id', this.influencer.id)
        self.formData.append('name', this.influencer.name)
        self.formData.append('description', this.influencer.description)
        self.formData.append('title', this.influencer.title)
        self.formData.append('meta_description', this.influencer.meta_description)
        self.formData.append('slug', this.influencer.slug)
        self.formData.append('is_active', this.influencer.is_active)
        self.formData.append('position', this.influencer.position)
        self.$emit('loading', true)
        this.axios({
          method: 'PATCH',
          url: '/influencer/' + id + '/',
          data: self.formData
        }).then(response => {
          self.$emit('loading', false)
          self.$emit('alert', 'success', {'Se guardo correctamente': []})
          self.$router.push({name: 'influencer_detail', params: { id: response.data.id }})
        }).catch(error => {
          self.$emit('loading', false)
          self.$emit('alert', status, error.response.data)
        })
      }
    }
  }
</script>
