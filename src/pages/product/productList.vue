<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Product</h3>
        <search-global nameUrl="product_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="product_update" :headerField="headerField" :tablaDataList="productList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'productList',
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
            field: 'slug',
            name: 'Url',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'position',
            name: 'Posición',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'is_active',
            name: 'Activo',
            col: 'col-2',
            orderBy: false,
            is_boolean: true,
            type: 'boolean'
          }
        ],
        productList: {},
        params: {

        }
      }
    },
    created () {
      console.log('entro')
      this.getProductClass()
    },
    methods: {
      getProductClass () {
        var self = this
        self.params['fields'] = 'id,name,slug'
        this.axios.get('/product/product/', {
          params: self.params
        }).then(response => {
          self.productList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'product', query: order})
        this.getProductClass()
        console.log(order, 'order')
      }
    }
  }
</script>
