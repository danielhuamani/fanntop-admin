<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Usuarios</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' nameUrl="user_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="user_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
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
            field: 'first_name',
            fieldOrder: 'first_name',
            name: 'Nombre',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'last_name',
            fieldOrder: 'last_name',
            name: 'Apellidos',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'email',
            fieldOrder: 'email',
            name: 'Email',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'user_influencer',
            fieldOrder: 'user_user_influencer__influencer__name',
            name: 'Tipo de Usuario',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'is_active',
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
        this.axios.get('/custom_auth/users/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data.results
        })
      }
    }
  }
</script>
