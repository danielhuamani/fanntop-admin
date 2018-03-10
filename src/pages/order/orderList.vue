<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Ordenes</h3>
        <search-global ></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="order_read_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'orders',
    components: {
      searchGlobal,
      tableGlobal
    },
    data () {
      return {
        headerField: [
          {
            field: 'order_order_customer.first_name',
            name: 'Nombre',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'order_order_customer.last_name',
            name: 'Apellidos',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'order_order_customer.email',
            name: 'Email',
            col: 'col-3',
            orderBy: false,
            type: 'text'
          },
          {
            field: 'status',
            name: 'Estado',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'total',
            name: 'Total',
            col: 'col-1',
            orderBy: false,
            type: 'text'
          }
        ],
        dataList: {},
        params: {}
      }
    },
    created () {
      this.getOrder()
    },
    methods: {
      getOrder () {
        var self = this
        this.axios.get('/order/order/', {
          params: {
            '!fields': 'order_orderdetail,order_ordershipping'
          }
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'client', query: order})
        this.getOrder()
        console.log(order, 'order')
      }
    }
  }
</script>
