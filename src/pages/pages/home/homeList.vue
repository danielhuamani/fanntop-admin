<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Home Banner</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' nameUrl="home_create"></search-global>
        <table-global v-on:orderBy="orderBy"  nameUrl="home_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'home',
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
            field: 'name',
            fieldOrder: 'name',
            name: 'Nombre',
            col: 'col-5',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'image_crop',
            name: 'Image',
            col: 'col-5',
            is_image: true,
            orderBy: false,
            type: 'image'
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
        this.axios.get('/pages/home/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data
        })
      }
    }

  }
</script>
