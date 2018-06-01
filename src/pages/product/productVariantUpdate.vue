<template>
  <form @submit.prevent="saveProduct()" action=""  class="row">
    <div class="col-12 page">

      <div class="page__header material d-flex  justify-content-between align-items-center">
        <div class="
        ">
          <span class="" v-for='attrOption in productVariant.product_attribute_option'> {{attrOption.name_attr}}: {{attrOption.option}} </span>
        </div>
        <div class="buttons">
          <a href="" @click.prevent="$router.go(-1)" class="btn btn-secondary btn-cancel"><i class="fa fa-undo-alt"></i> Cancelar</a>
          <button class="btn btn-success btn-save">
            <i class="fa fa-save"></i>
            Guardar
          </button>
        </div>
      </div>
      <div class="d-flex  ">
        <div class="col-8 ">
          <div class="row  material content">
            <div class="col-12 ">
              <h5 class="material__title">Galeria Imagenes</h5>
              <div class="row">
                <div class="col-12">
                  <div class="content__image">
                    <label class="custom-file content__file" id="file_banner">
                    <input type="file" id="file_banner" class="custom-file-input content__file__input"  @change="fileUpload($event, 'banner')">
                    <span class="custom-file-control content__file__control">
                      <img :src="fileImage" alt="" width="225" height="225">
                    </span>
                    <i v-if='!fileImage' class="far fa-images content__image__icon"></i>
                    </label>
                  </div>
                </div>

              </div>
              <div class="row">
                <div class="col-3" v-for="images in galeryImages">
                  <div class="card_img">
                    <img :src="images.image_crop" alt="" width="100%" >
                    <div class="card_img__overlay">
                      <i class='far fa-trash card_img__delete' @click.prevent='deleteImg(images.id)'></i>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
        <div class="col-4 second_element">
          <div class="row  material content">
            <div class="col-12  content__field content__field--check">
              <label for="">¿Activo?</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model="productVariant.is_active"/>
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-12  content__field content__field--check">
              <label for="">Elegido a Mostrar</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model="productVariant.is_featured" />
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">SKU</label>
              <input type="text" class="form-control" v-model="productVariant.sku">
            </div>
            <div class="col-12 content__field">
              <label for="">Precio</label>
              <input type="text" class="form-control" v-model="productVariant.price">
            </div>
            <div class="col-12 content__field">
              <label for="">Stock</label>
              <input type="text" class="form-control" v-model="productVariant.stock">
            </div>


          </div>
        </div>

      </div>
    </div>
  </form>
</template>
<script>
  import Dropzone from 'vue2-dropzone'
  export default {
    name: 'productVariantUpdate',
    data () {
      return {
        productVariant: {},
        dropzoneOptions: {
          url: 'http://localhost:8000/api-v1/product/product-galery-image/',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          method: 'post',
          headers: { 'My-Awesome-Header': 'header value' }
        },
        galeryImages: [],
        fileImage: '',
        formData: new FormData()
      }
    },
    components: {
      Dropzone
    },

    created () {
      this.getProductVariant()
      this.getImages()
    },
    methods: {
      getImages () {
        const self = this
        this.axios({
          method: 'get',
          url: '/product/product-image/',
          params: {
            'product_id': self.$route.params.id_variant_update
          }
        }).then(response => {
          self.galeryImages = response.data
        })
      },
      getProductVariant () {
        var self = this
        this.axios({
          method: 'get',
          url: '/product/product-variant/' + self.$route.params.id_variant_update + '/'
        }).then(response => {
          self.productVariant = response.data
        })
      },
      showSuccess (file) {
        console.log('A file was successfully uploaded', file)
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
          vm.fileImage = reader.result
        }
        reader.readAsDataURL(file)
        this.formData.append('image', file)
        this.formData.append('product_class', this.$route.params.id)
        this.formData.append('product', this.$route.params.id_variant_update)
        this.saveGaleryImage()
      },
      saveProduct () {
        var self = this
        this.axios({
          method: 'put',
          url: '/product/product-variant/' + self.$route.params.id_variant_update + '/',
          data: self.productVariant
        }).then(response => {
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
        }).catch(error => {
          let status = ''
          if (error.response.status >= 400 && error.response.status < 500) {
            status = 'danger'
          }
          this.$emit('alert', status, error.response.data)
        })
      },
      saveGaleryImage () {
        var self = this
        this.axios({
          method: 'post',
          url: '/product/product-galery-image/',
          data: self.formData
        }).then(response => {
          self.getImages()
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
        }).catch(error => {
          let status = ''
          if (error.response.status >= 400 && error.response.status < 500) {
            status = 'danger'
          }
          this.$emit('alert', status, error.response.data)
        })
      },
      deleteImg (idImg) {
        const self = this
        this.axios({
          method: 'delete',
          url: '/product/product-image/' + idImg + '/',
          params: {
            'product_id': self.$route.params.id_variant_update
          }
        }).then(response => {
          self.getImages()
        })
      }
    }
  }
</script>
<style>
  @import 'vue2-dropzone/dist/vue2Dropzone.css'
</style>