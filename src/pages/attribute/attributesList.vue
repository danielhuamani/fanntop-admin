<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Atributos</h3>
        <search-global nameUrl="attribute_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="attribute_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'influencers',
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
            type: 'text'
          },
          {
            field: 'is_variation',
            name: 'Variación',
            col: 'col-2',
            orderBy: false,
            is_boolean: true,
            type: 'text'
          },
          {
            field: 'is_use_search',
            name: 'Busqueda',
            col: 'col-2',
            orderBy: false,
            is_boolean: true,
            type: 'text'
          },
          {
            field: 'is_filter',
            name: 'Filtrable',
            col: 'col-2',
            orderBy: false,
            is_boolean: true,
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
        dataList: {},
        params: {}
      }
    },
    created () {
      this.getAttribute()
    },
    methods: {
      getAttribute () {
        var self = this
        this.axios.get('/attribute/attribute', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'attribute', query: order})
        this.getAttribute()
        console.log(order, 'order')
      }
    }
  }
</script>
