<template>
  <form @submit.prevent="saveData()" action=""  class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Cupon</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'coupon'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
        <button class="btn btn-success btn-save">
          <i class="fa fa-save"></i>
          Guardar
        </button>
      </div>
      <div class="d-flex  ">
        <div class="col-4 ">
          <div class="row ">
            <div class="col-12 material content">
              <h5 class="material__title">Informacion Basica</h5>
              <div class="row">
                <div class="col-12 content__field">
                  <label for="">Nombre Cupon</label>
                  <input type="text" name="coupon_name" v-validate="'required'" :class="{'form-control--error': errors.has('coupon_name') }" v-model="coupon.name" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Tipo de descuento</label>
                  <select id="" class='form-control' name='type_discount' :class="{'form-control--error': errors.has('type_discount') }" v-validate="'required'" v-model='coupon.type_discount'>
                    <option value="" >Seleccione</option>
                    <option :value="ty_discount.value" v-for='ty_discount in type_discounts'>{{ty_discount.name}}</option>

                  </select>
                </div>
                <div class="col-12 content__field">
                  <label for="">Descuento</label>
                  <input type="number" step='0.10' name="discount" v-validate="'required'" :class="{'form-control--error': errors.has('discount') }" v-model="coupon.discount" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Cantidad de uso por cliente</label>
                  <input type="text" name="quantity_customer"  v-validate="'required'" :class="{'form-control--error': errors.has('quantity_customer') }" v-model="coupon.quantity_customer" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Prefijo</label>
                  <input type="text" name="prefix" v-validate="'required|alpha_spaces'" :class="{'form-control--error': errors.has('prefix') }" v-model="coupon.prefix" class="form-control">
                </div>
                <div class="col-12 content__field">
                  <label for="">Influenciador</label>
                  <select  name="influencer" multiple  v-validate="'required'" class="custom-select" :class="{'input': true, 'form-control--error': errors.has('influencer') }" v-model='coupon.influencers'>
                    <option v-for="influencer in influencers" :value="influencer.id">{{influencer.name}}</option>
                  </select>
                </div>
                <div class="col-12 content__field content__field--check">
                  <label for="">Limite de fecha?</label>
                  <div class="slider-checkbox">
                    <input type="checkbox" id="1" v-model="coupon.is_limit" />
                    <label class="label" for="1">
                      <span class="fa fa-times slider-checkbox__status--inactive slider-checkbox__status"></span>
                      <span class="fa fa-check slider-checkbox__status slider-checkbox__status--active"></span>
                    </label>
                  </div>
                </div>
                <div class="col-12 content__field" v-if='coupon.is_limit'>
                  <label for="">Rango Fecha</label>
                  <div class="input-group datepicker">
                    <date-picker v-model="time2" :confirm='true' @change='changeDate' format='dd/MM/yyyy' lang='es' :range='true' :shortcuts="shortcuts"></date-picker>
                  </div>
                </div>
              </div>
            </div>

<!--   -->

          </div>

        </div>
        <div class="col-8 second_element">
          <div class="row material content">
            <div class="col-12 ">
              <div class="row">
                <div class="col-12 content__field">
                  <label for="">Cantidad de cupones a generar</label>
                  <input type="text" name="quantity_generate" v-validate="'required'" :class="{'form-control--error': errors.has('quantity_generate') }" v-model="coupon.quantity_generate" class="form-control">
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
  import { EventBus } from '@/bus'
  import DatePicker from 'vue2-datepicker'
  export default {
    name: 'couponCreate',
    components: {
      DatePicker
    },
    data () {
      return {
        time2: '',
        shortcuts: [
          {
            text: 'Hoy',
            start: new Date(),
            end: new Date()
          }
        ],
        coupon: {
          name: '',
          influencers: [],
          is_limit: false,
          date_start: '',
          date_end: '',
          prefix: '',
          type_discount: '',
          discount: '',
          quantity_customer: 1,
          quantity_generate: ''
        },
        type_discounts: [
          {
            value: 'PTJ',
            name: 'Porcentaje (%)'
          },
          {
            value: 'SLS',
            name: 'Soles'
          }
        ],
        influencers: []
      }
    },
    created () {
      this.getInfluencers()
    },
    mounted () {

    },
    methods: {
      getInfluencers () {
        var self = this
        this.axios.get('/influencer', {
          params: {
            fields: 'id,name'
          }
        }).then(response => {
          self.influencers = response.data
        })
      },
      formatDate (date) {
        var year = date.getFullYear().toString()
        var month = (date.getMonth() + 101).toString().substring(1)
        var day = (date.getDate() + 100).toString().substring(1)
        return year + '-' + month + '-' + day
      },
      changeDate (value) {
        if (value) {
          this.coupon.date_start = this.formatDate(value[0])
          this.coupon.date_end = this.formatDate(value[1])
        } else {
          this.coupon.date_start = ''
          this.coupon.date_end = ''
        }
      },
      saveData () {
        var self = this
        self.$validator.validateAll().then((result) => {
          if (result) {
            self.axios({
              method: 'post',
              url: '/promotion/coupon/',
              data: self.coupon
            }).then(response => {
              EventBus.$emit('alert', 'success', {'Se guardo correctamente': []})
              self.$router.push({name: 'coupon_update', params: { id: response.data.id }})
            }).catch(error => {
              console.log('err', error)
            })
          } else {
            console.log('error')
          }
        })
      }
    },
    computed: {

    }
  }
</script>
<style>
  .mx-datepicker{
    width: 100%;
  }
</style>