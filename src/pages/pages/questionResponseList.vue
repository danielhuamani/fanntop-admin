<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Preguntas y Respuestas</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' nameUrl="frecuent_question_create"></search-global>
        <table-global v-on:orderBy="orderBy"  nameUrl="frecuent_question_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'questionResponse',
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
            field: 'question',
            fieldOrder: 'question',
            name: 'Pregunta',
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
        this.axios.get('/pages/frecuent-question/', {
          params: self.filter
        }).then(response => {
          self.dataList = response.data
        })
      }
    }

  }
</script>
