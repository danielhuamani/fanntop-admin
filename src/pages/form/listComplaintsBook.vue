<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Libros Reclamaciones</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' ></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="complaints_book_read" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'complaintsBookList',
    components: {
      searchGlobal,
      tableGlobal
    },
    mixins: [filter],
    data () {
      return {
        headerField: [
          {
            field: 'email',
            fieldOrder: 'email',
            name: 'Email',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'first_name',
            fieldOrder: 'first_name',
            name: 'Nombres',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'last_name',
            fieldOrder: 'last_name',
            name: 'Apellidos',
            col: 'col-2',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'creation',
            fieldOrder: 'created',
            name: 'Fecha Creación',
            col: 'col-3',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          }
        ],
        dataList: {},
        filter: {
          field: '',
          orderBy: '',
          search: '',
          fields: 'id,email,first_name,last_name,creation'
        }
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      getDataList () {
        var self = this
        this.axios.get('/form/complaints-book/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data.results
        })
      }
    }
  }
</script>
