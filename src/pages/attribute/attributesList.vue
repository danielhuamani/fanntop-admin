<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Atributos</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' nameUrl="attribute_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="attribute_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'influencers',
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
            type: 'text'
          },
          {
            field: 'is_variation',
            fieldOrder: 'is_variation',
            name: 'Variación',
            col: 'col-2',
            orderBy: false,
            type: 'boolean'
          },
          {
            field: 'type_name',
            fieldOrder: 'type_name',
            name: 'Tipo Atributo',
            col: 'col-2',
            orderBy: true,
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
        this.axios.get('/attribute/attribute', {
          params: self.filter
        }).then(response => {
          self.$router.push({name: 'attribute', query: self.filter})
          self.dataList = response.data.results
        })
      }
    }
  }
</script>
