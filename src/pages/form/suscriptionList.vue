<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Suscripción</h3>
        <search-global ></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="client_read" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'suscriptionList',
    components: {
      searchGlobal,
      tableGlobal
    },
    data () {
      return {
        headerField: [
          {
            field: 'email',
            name: 'Email',
            col: 'col-5',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'creation',
            name: 'Fecha Creación',
            col: 'col-6',
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
        this.axios.get('/form/suscription/', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'client', query: order})
        this.getClient()
        console.log(order, 'order')
      }
    }
  }
</script>
