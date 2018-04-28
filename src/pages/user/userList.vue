<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Usuarios</h3>
        <search-global nameUrl="user_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="user_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'clients',
    components: {
      searchGlobal,
      tableGlobal
    },
    data () {
      return {
        headerField: [
          {
            field: 'first_name',
            name: 'Nombre',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'last_name',
            name: 'Apellidos',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'email',
            name: 'Email',
            col: 'col-3',
            orderBy: false,
            type: 'text'
          },
          {
            field: 'user_influencer',
            name: 'Tipo de Usuario',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'is_active',
            name: 'Activo',
            col: 'col-1',
            orderBy: false,
            is_boolean: false,
            type: 'boolean'
          }
        ],
        dataList: {},
        params: {}
      }
    },
    created () {
      this.getUser()
    },
    methods: {
      getUser () {
        var self = this
        this.axios.get('/custom_auth/users/', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'user', query: order})
        this.getUser()
      }
    }
  }
</script>
