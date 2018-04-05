<template>
  <form  @submit.prevent="saveProduct()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Order </h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'order'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
      <div class="row row-status" v-if='order.type_status == "PG"'>
        <div class="col-4">
          <h5 @click='changeStatus("AL")' :class="[activeShipping('AL', 'DS', 'EG', order.type_status_shipping) ? 'active' : '']">En Almacén</h5>
        </div>
        <div class="col-4">
          <h5 @click='changeStatus("DS")' :class="[activeShipping('', 'DS', 'EG', order.type_status_shipping) ? 'active' : '']">En Despacho</h5>
        </div>
        <div class="col-4">
          <h5 @click='changeStatus("EG")' :class="[activeShipping('', '', 'EG', order.type_status_shipping) ? 'active' : '']">Entregado</h5>
        </div>
      </div>

      <div class="col-12 page">
          <div class="row">
            <div class="col-4">
              <div class="row material content">

                <div class="col-12 content__field content__field--check">
                  <label for="">Se envio email?</label>
                  <div class="slider-checkbox">
                    <p v-if='order.is_send_email'>Si</p>
                    <p v-else>No</p>
                  </div>
                </div>
                <div class="col-12 content__field content__field--check">
                  <label for="">Estado</label>
                  <div class="slider-checkbox">
                    <select name="" id="" class='form-control' v-model='order.type_status'>
                      <option value="PR_1">Pendiente</option>
                      <option value="RC">Rechazado</option>
                      <option value="PG">Pagado</option>
                      <option value="RE">Reembolso</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 content__field content__field--check">
                  <label for="">Código de Orden</label>
                </div>
                <div class="col-12 content__field content__field--check">
                  <strong>{{order.code}}</strong>
                </div>
                <div class="col-12 content__field content__field--check">
                  <label for="">Código de Culqui</label>

                </div>

                <div class="col-12 content__field content__field--check" v-if='order.extra_data'>
                  <strong>{{order.extra_data.id_charge}}</strong>
                </div>


              </div>
              <div class="row material content">

                <div class="col-12 ">
                  <h5 class='material__title'>Información Cliente</h5>
                  <div class="row">
                    <div class="col-4 content__field">
                      <label for="">Nombres:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_order_customer.first_name}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Apellidos:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_order_customer.last_name}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Email:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_order_customer.email}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Celular:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_order_customer.phone}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">T Documento:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_order_customer.type_document}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Documento:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_order_customer.document}}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row material content">

                <div class="col-12 ">
                  <h5 class='material__title'>Información Envio</h5>
                  <div class="row">
                    <div class="col-4 content__field">
                      <label for="">Nombres:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.first_name}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Apellidos:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.last_name}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Email:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.email}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Celular:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.phone}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">T Docu:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.type_document}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Documento:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.document}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Dirección:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.address}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Referencia:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.reference}}</strong>
                    </div>
                    <div class="col-4 content__field">
                      <label for="">Lugar:</label>
                    </div>
                    <div class="col-8 content__field">
                      <strong>{{order.order_ordershipping.ubigeo_full}}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-8 second_element" >
                <div class="row material content">
                  <div class="col-12">
                    <h5 class='material__title'>Mis Productos</h5>
                    <div class="row">
                      <div class="col-2">
                        <strong for="">Imagen</strong>
                      </div>
                      <div class="col-4">
                        <strong for="">Nombre</strong>
                      </div>
                      <div class="col-2">
                        <strong for="">Cantidad</strong>
                      </div>
                      <div class="col-2">
                        <strong for="">Precio</strong>
                      </div>
                      <div class="col-2">
                        <strong for="">Sub total</strong>
                      </div>
                    </div>
                    <br>
                    <div class="row" v-for='detail in order.order_orderdetail'>
                      <div class="col-2">
                        <img :src="detail.productdetail.product_image" alt="">
                      </div>
                      <div class="col-4">
                        {{detail.productdetail.product_name}}
                      </div>
                      <div class="col-2">
                        {{detail.quantity}}
                      </div>
                      <div class="col-2">
                        {{detail.price}}
                      </div>
                      <div class="col-2">
                        {{detail.sub_total}}
                      </div>
                    </div>
                    <br>
                    <hr>
                    <div class="row">
                      <div class="col-8"></div>
                      <div class="col-2">
                        <label for="">Sub Total </strong> </label>
                      </div>
                      <div class="col-2">
                        <strong>{{order.sub_total}}</strong>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-8"></div>
                      <div class="col-2">
                        <label for="">Envio</label>
                      </div>
                      <div class="col-2">
                        <strong>{{order.shipping_price}}</strong>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-8"></div>
                      <div class="col-2">
                        <label for="">Descuento </strong> </label>
                      </div>
                      <div class="col-2">
                        <strong>{{order.discount}}</strong>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-8"></div>
                      <div class="col-2">
                        <label for="">Total</label>
                      </div>
                      <div class="col-2">
                        <strong>{{order.total}}</strong>
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
    name: 'orderRearUpdate',
    data () {
      return {
        order: {
          'is_send_email': false,
          order_order_customer: {
            first_name: ''
          },
          order_ordershipping: {
            first_name: ''
          }
        },
        status_shipping: [
          {
            val: 'AL',
            name: 'En Almacén'
          },
          {
            val: 'DS',
            name: 'En Despacho'
          },
          {
            val: 'EG',
            name: 'Entregado'
          }
        ]
      }
    },
    created () {
      this.getOrder()
    },
    methods: {
      activeShipping (almance, despacho, entregado, status) {
        let arrayStatus = [almance, despacho, entregado]
        if (arrayStatus.indexOf(status) !== -1) {
          return 'active'
        }
        return ''
      },
      changeStatus (status) {
        this.order.type_status_shipping = status
      },
      saveProduct () {
        var self = this
        this.axios({
          method: 'PUT',
          url: '/order/order/' + this.$route.params.id + '/',
          data: self.order
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
      getOrder () {
        var self = this
        this.axios({
          method: 'get',
          url: '/order/order/' + self.$route.params.id + '/'

        }).then(response => {
          self.order = response.data
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
  .row-status{
    margin-top:40px;
    text-align: center;
    position: relative;
    &:after{
      content:'';
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      top:45%;
      background: #2e3c4f;
    }
    h5{
      display: inline-block;
      background: #2e3c4f;
      padding: 18px 15px;
      color:white;
      cursor: pointer;
      border-radius:8px;
      font-size: 16px;
      position: relative;
      z-index: 100;
    }
    h5.active{
      background: #28a745;
    }
  }
</style>