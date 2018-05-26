<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Influenciadores</h3>
        <search-global nameUrl="influencer_create" v-on:search='search' :isFilter='isFilter'></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="influencer_detail" :headerField="headerField" :tablaDataList="influencersList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  import filter from '@/mixins/filter'
  export default {
    name: 'influencers',
    mixins: [filter],
    components: {
      searchGlobal,
      tableGlobal
    },
    data () {
      return {
        isFilter: false,
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
            field: 'slug',
            fieldOrder: 'slug',
            name: 'Url',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'position',
            fieldOrder: 'position',
            name: 'Posición',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'is_active',
            fieldOrder: 'is_active',
            name: 'Activo',
            col: 'col-2',
            orderBy: false,
            type: 'boolean'
          }
        ],
        showFilter: false,
        influencersList: {},
        params: {},
        filter: {
          field: '',
          orderBy: '',
          search: ''
        }
      }
    },
    created () {
      console.log('entro')
      this.getDataList()
    },
    methods: {
      getDataList () {
        var self = this
        this.axios.get('/influencer', {
          params: self.filter
        }).then(response => {
          self.influencersList = response.data.results
          self.$router.push({name: 'influencer', query: self.filter})
        })
      }
    }
  }
</script>
