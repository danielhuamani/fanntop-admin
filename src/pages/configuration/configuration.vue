<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Formas de Pago</h3>
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
              <label for="">Nombre de la tienda</label>
              <input type="text" v-model='configuration.name' class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Email enviar correo</label>
              <input type="text" v-model='configuration.email_contact' class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Telefono</label>
              <input type="text" v-model='configuration.phone' class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Youtube</label>
              <input type="text" v-model='configuration.youtube' class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Facebook</label>
              <input type="text" v-model='configuration.facebook' class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Twitter</label>
              <input type="text" v-model='configuration.twitter' class="form-control">
            </div>
            <div class="col-12 content__field">
              <label for="">Instagram</label>
              <input type="text" v-model='configuration.instagram' class="form-control">
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
    name: 'configurtion',
    components: {
      VueCkeditor
    },
    data () {
      return {
        configuration: {
          name: '',
          email_contact: '',
          phone: '',
          youtube: '',
          facebook: '',
          instagram: '',
          twitter: ''
        }
      }
    },
    created () {
      this.getConfiguration()
    },
    mounted () {

    },
    methods: {
      getConfiguration () {
        var self = this
        this.axios.get('/configuration/configuration/', {
        }).then(response => {
          self.configuration = response.data
        })
      },
      saveData () {
        var self = this
        this.axios({
          method: 'post',
          url: '/configuration/configuration/',
          data: self.configuration
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
