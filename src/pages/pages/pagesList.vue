<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Paginas Estaticas</h3>
        <search-global nameUrl="pages_create"></search-global>
        <table-global v-on:orderBy="orderBy"  nameUrl="pages_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'home',
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
            type: 'text'
          },
          {
            field: 'is_active',
            name: 'Activo',
            col: 'col-1',
            orderBy: false,
            type: 'boolean'
          }
        ],
        dataList: {},
        params: {}
      }
    },
    created () {
      this.getHomeBanners()
    },
    methods: {
      getHomeBanners () {
        var self = this
        this.axios.get('/pages/pages/', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'pages', query: order})
        this.getHomeBanners()
      }
    }

  }
</script>
