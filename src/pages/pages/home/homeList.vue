<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Home Banner</h3>
        <search-global nameUrl="home_create"></search-global>
        <table-global v-on:orderBy="orderBy"  nameUrl="home_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
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
            col: 'col-6',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'image_crop',
            name: 'Image',
            col: 'col-4',
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
        params: {}
      }
    },
    created () {
      this.getHomeBanners()
    },
    methods: {
      getHomeBanners () {
        var self = this
        this.axios.get('/pages/home/', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      orderBy (order) {
        this.params = order
        this.$router.push({name: 'home', query: order})
        this.getHomeBanners()
        console.log(order, 'order')
      }
    }

  }
</script>
