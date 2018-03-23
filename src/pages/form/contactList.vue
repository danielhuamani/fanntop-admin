<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Contacto</h3>
        <search-global ></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="client_read" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'contactList',
    components: {
      searchGlobal,
      tableGlobal
    },
    data () {
      return {
        headerField: [
          {
            field: 'first_name',
            name: 'Nombres',
            col: 'col-2',
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
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'subject',
            name: 'Asunto',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'creation',
            name: 'Fecha Creación',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          }
        ],
        dataList: {},
        params: {}
      }
    },
    created () {
      this.getClient()
    },
    methods: {
      getClient () {
        var self = this
        this.axios.get('/form/contact/', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'contact', query: order})
        this.getClient()
        console.log(order, 'order')
      }
    }
  }
</script>
