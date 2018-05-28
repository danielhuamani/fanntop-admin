<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Suscripción</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' ></search-global>
        <table-global  v-on:orderBy="orderBy"  :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'suscriptionList',
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
            field: 'email',
            fieldOrder: 'email',
            name: 'Email',
            col: 'col-5',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'creation',
            fieldOrder: 'created',
            name: 'Fecha Creación',
            col: 'col-6',
            orderBy: true,
            is_boolean: false,
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
        this.axios.get('/form/suscription/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data.results
        })
      }
    }
  }
</script>
