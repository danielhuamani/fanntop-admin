<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Pregunta {{pages.question}} </h3>
      <div class="page__header material d-flex  justify-content-between">
        <a href="" @click.prevent='modal.show=true' class='btn btn-danger '><i class='far fa-trash-alt'></i> Eliminar</a>
        <div class="button-group">
          <router-link :to="{ name: 'pages'}" class="btn btn-secondary btn-cancel">
              <i class="fa fa-undo-alt"></i>
              Cancelar
            </router-link>
          <a href="" class="btn btn-success btn-save" @click.prevent="saveData">
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
              <input type="text" name='question' :class="{'input': true, 'form-control--error': errors.has('question') }"  v-model="pages.question" class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Descripción</label>
              <VueCkeditor height='200' v-model='pages.content' language='es'></VueCkeditor>
            </div>
          </div>
          <div class="row material content">
            <div class="col-12">
              <h4 class="material__title">Seo</h4>
              <div class="row">
                <div class="col-12 content__field">
                  <label for="">Title</label>
                  <input type="text" name="title"  v-model='pages.title' v-validate="'required'" :class="{'input': true, 'form-control--error': errors.has('title') }" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Meta Description</label>
                  <input type="text" v-model='pages.meta_description' class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Url</label>
                  <input type="text" name="slug" v-model='pages.slug' v-validate="'required'" :class="{'input': true, 'form-control--error': errors.has('slug') }"  class="form-control">
                  <p class="content__seo text-primary"></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4 second_element">
          <div class="row  material content">
            <div class="col-12 content__field content__field--check">
              <label for="">Es Activo</label>
              <div class="slider-checkbox">
                <input type="checkbox" id="1" v-model='pages.is_active'>
                <label class="label" for="1">
                  <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                  <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                </label>
              </div>
            </div>
            <div class="col-12 content__field">
              <label for="">Posición</label>
              <input type="text" v-model="pages.position" class="form-control">
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
  import VueCkeditor from 'vueckeditor'
  export default {
    name: 'frecuentQuestionUpdate',
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
          urlRedirect: 'frecuent_question'
        },
        pages: {
          question: '',
          content: '',
          is_active: false,
          position: 0,
          title: '',
          slug: '',
          meta_description: ''
        }
      }
    },
    created () {
      this.modal.url = '/pages/frecuent-question/' + this.$route.params.id + '/'
      this.getFrecuentQuestion()
    },
    mounted () {

    },
    methods: {
      close () {
        this.modal.show = false
      },
      getFrecuentQuestion () {
        const self = this
        const id = this.$route.params.id
        this.axios.get('/pages/frecuent-question/' + id + '/', {
          params: self.params
        }).then(response => {
          self.pages = response.data
          self.modal.message = response.data.question
        })
      },
      saveData () {
        var self = this
        const id = this.$route.params.id
        this.axios({
          method: 'put',
          url: '/pages/frecuent-question/' + id + '/',
          data: self.pages
        }).then(response => {
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
          self.$router.push({name: 'frecuent_question_update', params: { id: response.data.id }})
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
      categoryData () {
        return this.list_category
      }
    }
  }
</script>
