<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Influenciadores</h3>
        <search-global></search-global>
        <table-global :headerField="headerField" ></table-global>
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
            col: 'col-3'
          },
          {
            field: 'slug',
            name: 'Url',
            col: 'col-3'
          },
          {
            field: 'position',
            name: 'Posición',
            col: 'col-3'
          },
          {
            field: 'is_active',
            name: 'Activo',
            col: 'col-2'
          }
        ],
        influencersList: {}
      }
    },
    created () {
      this.getInfluencers()
    },
    methods: {
      getInfluencers () {
        var self = this
        this.axios.get('/influencer').then(response => {
          self.influencersList = response.data
        })
      }
    }
  }
</script>