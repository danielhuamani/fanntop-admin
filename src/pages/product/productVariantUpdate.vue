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
              <h5 class="material__title">Galeria Imagenes</h5>
              <div class="row">
                <div class="col-12">
                  <div class="content__image">
                    <label class="custom-file content__file" id="file_banner">
                    <input type="file" id="file_banner" class="custom-file-input content__file__input"  @change="fileUpload($event, 'banner')">
                    <span class="custom-file-control content__file__control">
                      <img :src="fileImage" alt="" width="225" height="225">
                    </span>
                    </label>
                  </div>
                </div>

              </div>
              <div class="row">
                <div class="col-4" v-for="images in galeryImages">
                  <img :src="images.image" alt="" width="225" height="225">
                </div>

              </div>
            </div>
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
              <label for="">¿Activo?</label>
              <div class="checkbox">
                <label class="label">
                  <input  class="label__checkbox" v-model="productVariant.is_active" type="checkbox" />
                  <span class="label__text">
                    <span class="label__check">
                      <i class="fa fa-check icon"></i>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Elegido a Mostrar</label>
              <div class="checkbox">
                <label class="label">
                  <input  class="label__checkbox" v-model="productVariant.is_featured" type="checkbox" />
                  <span class="label__text">
                    <span class="label__check">
                      <i class="fa fa-check icon"></i>
                    </span>
                  </span>
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
      this.getGaleryImages()
    },
    methods: {
      getGaleryImages () {
        const self = this
        this.axios({
          method: 'get',
          url: '/product/product-galery-image/',
          params: {
            'product': self.$route.params.id_variant_update
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
        this.saveInfluencer()
      },
      saveInfluencer () {
        var self = this
        this.axios({
          method: 'post',
          url: '/product/product-galery-image/',
          data: self.formData
        }).then(response => {
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
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
<style>
  @import 'vue2-dropzone/dist/vue2Dropzone.css'
</style>