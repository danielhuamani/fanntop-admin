<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Cupones</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' nameUrl="coupon_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="coupon_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'couponList',
    components: {
      searchGlobal,
      tableGlobal
    },
    mixins: [filter],
    data () {
      return {
        isFilter: false,
        showFilter: false,
        headerField: [
          {
            field: 'name',
            fieldOrder: 'name',
            name: 'Nombre',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'type_discount',
            fieldOrder: 'type_discount',
            name: 'Tipo descuento',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'discount',
            fieldOrder: 'discount',
            name: 'Descuento',
            col: 'col-2',
            orderBy: false,
            type: 'text'
          },
          {
            field: 'prefix',
            fieldOrder: 'prefix',
            name: 'Prefijo',
            col: 'col-2',
            orderBy: false,
            type: 'text'
          },
          {
            field: 'quantity_customer',
            fieldOrder: 'quantity_customer',
            name: 'Cantidad de uso',
            col: 'col-2',
            orderBy: false,
            type: 'text'
          }
        ],
        dataList: {},
        filter: {
          field: '',
          orderBy: '',
          search: ''
        }
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      getDataList () {
        var self = this
        this.axios.get('/promotion/coupon/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data.results
        })
      }

    }
  }
</script>
