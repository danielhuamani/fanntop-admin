<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Grupo Atributos</h3>
        <search-global nameUrl="family_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="family_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
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
            col: 'col-10',
            orderBy: true,
            is_boolean: false
          },
          {
            field: 'is_active',
            name: 'Activo',
            col: 'col-1',
            orderBy: false,
            is_boolean: true
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
        this.axios.get('/family/family', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'family', query: order})
        this.getAttribute()
        console.log(order, 'order')
      }
    }
  }
</script>