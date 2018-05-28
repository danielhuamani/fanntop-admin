<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Clientes</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' ></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="client_read" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'clients',
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
            field: 'user.first_name',
            fieldOrder: 'user__first_name',
            name: 'Nombre',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'user.last_name',
            fieldOrder: 'user__last_name',
            name: 'Apellidos',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'user.email',
            fieldOrder: 'user__email',
            name: 'Email',
            col: 'col-3',
            type: 'text',
            orderBy: true
          },
          {
            field: 'user.is_active',
            fieldOrder: '',
            name: 'Activo',
            col: 'col-1',
            orderBy: false,
            type: 'boolean'
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
        this.axios.get('/customers/customers/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data.results
        })
      }
    }
  }
</script>
