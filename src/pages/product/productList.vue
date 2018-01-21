<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Product</h3>
        <search-global nameUrl="product_create"></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="product_create" :headerField="headerField" :tablaDataList="influencersList" ></table-global>
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
            col: 'col-3',
            orderBy: true,
            is_boolean: false
          },
          {
            field: 'slug',
            name: 'Url',
            col: 'col-3',
            orderBy: true,
            is_boolean: false
          },
          {
            field: 'position',
            name: 'Posición',
            col: 'col-3',
            orderBy: true,
            is_boolean: false
          },
          {
            field: 'is_active',
            name: 'Activo',
            col: 'col-2',
            orderBy: false,
            is_boolean: true
          }
        ],
        influencersList: {},
        params: {}
      }
    },
    created () {
      console.log('entro')
      this.getInfluencers()
    },
    methods: {
      getInfluencers () {
        var self = this
        this.axios.get('/product', {
          params: self.params
        }).then(response => {
          self.influencersList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'product', query: order})
        this.getInfluencers()
        console.log(order, 'order')
      }
    }
  }
</script>