<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Cupones</h3>
        <search-global nameUrl="coupon_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="coupon_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'couponList',
    components: {
      searchGlobal,
      tableGlobal
    },
    data () {
      return {
        headerField: [
          {
            field: 'name',
            name: 'Nombre',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'type_discount',
            name: 'Tipo descuento',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'discount',
            name: 'Descuento',
            col: 'col-2',
            orderBy: false,
            type: 'text'
          },
          {
            field: 'prefix',
            name: 'Prefijo',
            col: 'col-2',
            orderBy: false,
            type: 'text'
          },
          {
            field: 'quantity_customer',
            name: 'Cantidad de uso',
            col: 'col-2',
            orderBy: false,
            type: 'text'
          }
        ],
        dataList: {},
        params: {

        }
      }
    },
    created () {
      this.getCoupon()
    },
    methods: {
      getCoupon () {
        var self = this
        this.axios.get('/promotion/coupon/', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'client', query: order})
        this.getCoupon()
        console.log(order, 'order')
      }
    }
  }
</script>
