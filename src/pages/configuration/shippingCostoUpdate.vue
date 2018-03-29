<template>

  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Costo de envio {{ubigeoFullName}}</h3>
      <div class="page__header material d-flex  justify-content-end">

      <a href="" class="btn btn-secondary btn-cancel" @click.prevent="goBack">
          <i class="fa fa-undo-alt"></i>
          Regresar
        </a>
        <a href="" class="btn btn-success btn-save" @click.prevent="saveShipping">
          <i class="fa fa-save"></i>
          Guardar
        </a>
      </div>
      <div class="d-flex material content">
        <div class="col-12">
          <div class="row">
            <div class="col-4 content__field">
              <label for="">Precio</label>
              <input type="text" v-model="shipping.price" class="form-control">
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
    name: 'shippingUpdate',
    components: {
      VueCkeditor
    },
    data () {
      return {
        shipping: {
          id: null,
          price: '',
          ubigeo: ''
        },
        ubigeoFullName: ''
      }
    },
    created () {
      this.getShipping()
    },
    mounted () {

    },
    methods: {
      getShipping () {
        var self = this
        var id = this.$route.params.id
        this.axios.get('/shipping/shipping-cost/' + id + '/', {
          params: {
            get_distritos: true
          }
        }).then(response => {
          self.shipping = response.data
          self.ubigeoFullName = response.data.full_ubigeo
        })
      },
      goBack () {
        this.$router.go(-1)
      },
      saveShipping () {
        var id = this.$route.params.id
        var self = this
        this.axios({
          method: 'PATCH',
          url: '/shipping/shipping-cost/' + id + '/',
          data: self.shipping,
          params: {
            get_distritos: true
          }
        }).then(response => {
          self.$emit('loading', false)
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
          self.$router.push({name: 'shipping_cost', params: { id: response.data.id }})
          console.log('response', response)
        }).catch(error => {
          self.$emit('loading', false)
          console.log('error', error)
        })
      }
    }
  }
</script>
