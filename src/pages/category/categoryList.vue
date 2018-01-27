<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Categorias</h3>
        <search-global nameUrl="category_create"></search-global>
        <table-nivel-global  v-on:orderBy="orderBy" nameUrl="category_update" :headerField="headerField" :tablaDataList="dataList" ></table-nivel-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableNivelGlobal from '@/componentsGlobals/tableNivel'
  export default {
    name: 'categoryList',
    components: {
      searchGlobal,
      tableNivelGlobal
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
        dataList: {},
        params: {}
      }
    },
    created () {
      console.log('entro')
      this.getData()
    },
    methods: {
      getData () {
        var self = this
        self.params['category'] = 'category'
        this.axios.get('/category', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'category', query: order})
        this.getData()
        console.log(order, 'order')
      }
    }
  }
</script>
