<template>
  <form  @submit.prevent="saveProduct()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Atributo</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'client'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
      <div class="col-12 page">
          <div class="d-flex">
            <div class="col-4">
              <div class="row material content">
                <div class="col-12 content__field content__field--check">
                  <label for="">Es Activo</label>
                  <div class="slider-checkbox">
                    <input type="checkbox" id="1" v-model='client.is_active'/>
                    <label class="label" for="1">
                      <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                      <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                    </label>
                  </div>
                </div>
                <div class="col-12 content__field content__field--check">
                  <label for="">Se envio email?</label>
                  <div class="slider-checkbox">
                    <p v-if='client.is_send_email'>Si</p>
                    <p v-else>No</p>
                  </div>
                </div>
                <div class="col-12 content__field content__field--check">
                  <label for=""> terminos y condiciones?</label>
                  <div class="slider-checkbox">
                    <p v-if='client.terms_conditions'>Si</p>
                    <p v-else>No</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-8 second_element" >
                <div class="row material content">
                  <div class="col-12">
                    <h5 class='material__title'>Información</h5>
                    <div class="row">
                      <div class="col-6 content__field">
                        <label for="">Nombres</label>
                        <p>{{client.user.first_name}}</p>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Apellidos</label>
                        <p>{{client.user.last_name}}</p>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Tipo documento</label>
                        <p>{{client.type_document}}</p>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Documento</label>
                        <p>{{client.documento}}</p>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Celular</label>
                        <p>{{client.phone}}</p>
                      </div>
                      <div class="col-6 content__field">
                        <label for="">Genero</label>
                        <p>{{client.gender}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row material content">
                  <div class="col-12">
                    <h5 class='material__title'>Mis Direcciones</h5>
                    <div class="row justify-content-between">
                      <div class="col-5 content__field material__card" v-for='shipping in client.customer_shipping_address'>
                        <label for="">Nombres: {{shipping.first_name}}</label>
                        <label for="">Apellidos: {{shipping.last_name}}</label>
                        <label for="">Dirección: {{shipping.address}}</label>
                        <label for="">Tipo Documento: {{shipping.type_document}}</label>
                        <label for="">Documento: {{shipping.document}}</label>
                        <label for="">Referencia: {{shipping.referebce}}</label>
                        <label for="">{{shipping.get_ubigeo_full}}</label>


                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>

    </div>
  </form>
</template>
<script>
  export default {
    name: 'clientRead',
    data () {
      return {
        client: {
          user: {
            first_name: '',
            last_name: ''

          }
        }
      }
    },
    created () {
      this.getClient()
    },
    methods: {
      saveProduct () {
        var self = this
        this.axios({
          method: 'PUT',
          url: '/customers/customers/' + this.$route.params.id + '/',
          data: self.client
        }).then(response => {
          this.$emit('alert', 'success', {'Se guardo correctamente': []})
          // self.$router.push({name: 'category_update', params: { id: response.data.id }})
        }).catch(error => {
          let status = ''
          if (error.response.status >= 400 && error.response.status < 500) {
            status = 'danger'
          }
          this.$emit('alert', status, error.response.data)
        })
      },
      getClient () {
        var self = this
        this.axios({
          method: 'get',
          url: '/customers/customers/' + self.$route.params.id + '/'

        }).then(response => {
          self.client = response.data
        })
      }
    }
  }
</script>
<style lang='scss'>
  .material{
    &__card{
      border: 1px black dashed;
    }
  }
</style>