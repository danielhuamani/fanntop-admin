<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Productos</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true' nameUrl="product_create"></search-global>
        <div class=" card card--filter" v-if='showFilter'>
          <div class="card-header">
            <h5 class='card-header__title'>Filtros</h5>
          </div>
          <div class="card-body ">
            <div class="row">
              <div class="col-2">
                <div class="form-group">
                  <label for="">Precio Desde</label>
                  <input type="number" class='form-control' @keyup='setFilter()' v-model='filter.price_from'>
                </div>
              </div>
              <div class="col-2">
                <div class="form-group">
                  <label for="">Precio Hasta</label>
                  <input type="number" class='form-control' @keyup='setFilter()' v-model='filter.price_to'>
                </div>
              </div>
              <div class="col-2" >
                <div class="form-group">
                  <label for="">PUblicado</label>
                  <select name=""  id="" @change='setFilter()' v-model='filter.is_published' class='form-control'>
                    <option value="">Todos</option>
                    <option value="si" >Publicado</option>
                    <option value="no" >No Publicado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-end">
              <a href="" @click.prevent='showFilter=false' class='btn btn-dark'>Cerrar</a>
            </div>
        </div>
        <div class="card card--margin_filter" v-if='existFilter() && !showFilter'>
          <div class="card-body card-body--filters">
            <div class="row card-body__filters" >
              <div class="col-2" v-if='filter.price_from'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'>Desde <strong>S/ {{filter.price_from}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("price_from")'></i>
                </div>
              </div>
              <div class="col-2" v-if='filter.price_to'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'>Hasta <strong>S/ {{filter.price_to}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("price_to")'>
                  </i>
                </div>
              </div>
              <div class="col-2" v-if='filter.is_published'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'> Publicado <strong> {{filter.is_published}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("is_published")'>
                  </i>
                </div>
              </div>

            </div>
          </div>
        </div>
        <table-global v-on:orderBy="orderBy" nameUrl="product_update" :headerField="headerField" :tablaDataList="productList" ></table-global>
      </div>
    </div>
</template>
<script>
  import filter from '@/mixins/filter'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'productList',
    components: {
      searchGlobal,
      tableGlobal
    },
    mixins: [filter],
    data () {
      return {
        isFilter: true,
        showFilter: false,
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
            field: 'influencer_name',
            fieldOrder: 'influencer',
            name: 'Influencer',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'price',
            fieldOrder: 'price',
            name: 'Precio',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'is_published',
            fieldOrder: 'is_published',
            name: 'Publicado',
            col: 'col-1',
            orderBy: false,
            type: 'boolean'
          }
        ],
        filter: {
          price_to: '',
          price_from: '',
          is_published: '',
          field: '',
          orderBy: '',
          fields: 'id,name,slug,is_published,influencer_name,price',
          search: ''
        },
        productList: {},
        params: {

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
        this.axios.get('/product/product/', {
          params: self.filter
        }).then(response => {
          self.productList = response.data.results
        })
      }
    }
  }
</script>
