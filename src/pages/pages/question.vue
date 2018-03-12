<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Preguntas Frecuentes</h3>
      <div class="page__header material d-flex  justify-content-end">

        <a href="" class="btn btn-success btn-save" @click.prevent="saveData()">
          <i class="fa fa-save"></i>
          Guardar
        </a>
      </div>
      <div class="d-flex material content">
        <div class="col-12">
          <div class="row">
            <div class="col-12 content__field">
              <label for="">Descripción</label>
              <VueCkeditor language='es' v-model="question.content"></VueCkeditor>
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
    name: 'question',
    components: {
      VueCkeditor
    },
    data () {
      return {
        question: {
          content: ''
        },
        influencerName: '',
        fileImage: '',
        fileImageBanner: '',
        formData: new FormData()
      }
    },
    created () {
    },
    mounted () {

    },
    methods: {
      getQuestion () {
        var self = this
        this.axios.get('/pages/question/', {
        }).then(response => {
          self.question = response.data
        })
      },
      fileUpload (e, typeImage) {
        console.log(typeImage, 'typeImage')
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
      saveData () {
        var self = this
        this.axios({
          method: 'post',
          url: '/pages/question/',
          data: self.question
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
