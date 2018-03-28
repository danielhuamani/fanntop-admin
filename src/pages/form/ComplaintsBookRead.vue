<template>
  <form  @submit.prevent="saveProduct()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Libro Reclamaciones {{complaintsBook.uuid}} </h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'order'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>

      </div>


      <div class="col-12 page">
        <div class="row material content">
          <div class="col-12">
            <h5 class='material__title'>1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE</h5>
            <div class="row">
              <div class="col-4">
                <label for="">Nombre</label>
                <p>{{complaintsBook.first_name}}</p>
              </div>
              <div class="col-4">
                <label for="">Apellidos</label>
                <p>{{complaintsBook.last_name}}</p>
              </div>
              <div class="col-4">
                <label for="">Email</label>
                <p>{{complaintsBook.email}}</p>
              </div>
              <div class="col-4">
                <label for="">Celular</label>
                <p>{{complaintsBook.phone}}</p>
              </div>
              <div class="col-4">
                <label for="">Tipo Documento</label>
                <p>{{complaintsBook.type_document}}</p>
              </div>
              <div class="col-4">
                <label for="">Documento</label>
                <p>{{complaintsBook.document}}</p>
              </div>
              <div class="col-4">
                <label for="">Ubigeo</label>
                <p>{{complaintsBook.ubigeo}}</p>
              </div>
              <div class="col-4">
                <label for="">Dirección</label>
                <p>{{complaintsBook.address}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row material content">
          <div class="col-12">
            <h5 class='material__title'>2. IDENTIFICACIÓN DEL BIEN CONTRATADO</h5>
            <div class="row">
              <div class="col-4">
                <label for="">Tipo Producto</label>
                <p>{{complaintsBook.well_contracted}}</p>
              </div>
              <div class="col-4">
                <label for="">Monto</label>
                <p>{{complaintsBook.mount}}</p>
              </div>
              <div class="col-4">
                <label for="">Pedido</label>
                <p>{{complaintsBook.pedido}}</p>
              </div>
              <div class="col-4">
                <label for="">Descripción</label>
                <p>{{complaintsBook.desciption}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row material content">
          <div class="col-12">
            <h5 class='material__title'>3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDO</h5>
            <div class="row">
              <div class="col-4">
                <label for="">Tipo Producto</label>
                <p>{{complaintsBook.type_claim}}</p>
              </div>
              <div class="col-4">
                <label for="">Monto</label>
                <p>{{complaintsBook.consumers_order}}</p>
              </div>
              <div class="col-4">
                <label for="">Pedido</label>
                <p>{{complaintsBook.detail}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row material content">
          <div class="col-12">
            <h5 class='material__title'>4. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR</h5>
            <div class="row">
              <div class="col-12">
                <label for="">Descripción</label>
                <p>{{complaintsBook.observation}}</p>
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
    name: 'orderRearUpdate',
    data () {
      return {
        complaintsBook: {
        }
      }
    },
    created () {
      this.getComplaintsBook()
    },
    methods: {
      getComplaintsBook () {
        var self = this
        this.axios({
          method: 'get',
          url: '/form/complaints-book/' + self.$route.params.id + '/'
        }).then(response => {
          self.complaintsBook = response.data
        })
      }
    }
  }
</script>
<style lang='scss'>

</style>