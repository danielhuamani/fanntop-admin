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
              <label for="">Descripción</label>
              <VueCkeditor language='es' v-model="paymentMethods.content"></VueCkeditor>
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
    name: 'paymentMethods',
    components: {
      VueCkeditor
    },
    data () {
      return {
        paymentMethods: {
          content: ''
        },
        influencerName: '',
        fileImage: '',
        fileImageBanner: '',
        formData: new FormData()
      }
    },
    created () {
      this.getQuestion()
    },
    mounted () {

    },
    methods: {
      getQuestion () {
        var self = this
        this.axios.get('/pages/payment-methods/', {
        }).then(response => {
          self.paymentMethods = response.data
        })
      },
      saveData () {
        var self = this
        this.axios({
          method: 'post',
          url: '/pages/payment-methods/',
          data: self.paymentMethods
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
