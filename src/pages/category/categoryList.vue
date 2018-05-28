<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Categorias</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' nameUrl="category_create"></search-global>
        <table-nivel-global  v-on:orderBy="orderBy" nameUrl="category_update" :headerField="headerField" :tablaDataList="dataList" ></table-nivel-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableNivelGlobal from '@/componentsGlobals/tableNivel'
  export default {
    name: 'categoryList',
    components: {
      searchGlobal,
      tableNivelGlobal
    },
    mixins: [filter],
    data () {
      return {
        isFilter: false,
        headerField: [
          {
            field: 'name',
            fieldOrder: 'name',
            name: 'Nombre',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'slug',
            fieldOrder: 'slug',
            name: 'Url',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'position',
            fieldOrder: 'position',
            name: 'Posición',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'is_active',
            fieldOrder: 'is_active',
            name: 'Activo',
            col: 'col-2',
            orderBy: false,
            type: 'boolean'
          }
        ],
        dataList: {},
        filter: {
          field: '',
          orderBy: '',
          search: '',
          category: 'category'
        }
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      getDataList () {
        var self = this
        this.axios.get('/category/category/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data.results
        })
      }
    }
  }
</script>
