<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Ordenes</h3>
        <search-global v-on:search='search' :isFilter='isFilter' v-on:displayFilter='showFilter=true'></search-global>
        <div class=" card card--filter" v-if='showFilter'>
          <div class="card-header">
            <h5 class='card-header__title'>Filtros</h5>
          </div>
          <div class="card-body ">
            <div class="row">
              <div class="col-2">
                <div class="form-group">
                  <label for="">Total Desde</label>
                  <input type="number" class='form-control' @keyup='setFilter()' v-model='filter.total_from'>
                </div>
              </div>
              <div class="col-2">
                <div class="form-group">
                  <label for="">Total Hasta</label>
                  <input type="number" class='form-control' @keyup='setFilter()' v-model='filter.total_to'>
                </div>
              </div>
              <div class="col-3">
                <div class="form-group">
                  <label for="">Fecha Desde</label>
                  <date-picker v-model="date_from" id='fecha1'  @change='changeDateFrom' lang='es' format='dd/MM/yyyy'></date-picker>
                </div>
              </div>
              <div class="col-3">
                <div class="form-group">
                  <label for="">Fecha Hasta</label>
                  <date-picker v-model="date_to" id='fecha2' lang='es' @change='changeDateTo' format='dd/MM/yyyy'> </date-picker>
                </div>
              </div>
              <div class="col-2">
                <div class="form-group">
                  <label for="">Estado</label>
                  <select name=""  id="" @change='setFilter()' v-model='filter.status' class='form-control'>
                    <option value="">Todos</option>
                    <option :value="st.value" v-for='st in status'>
                      {{st.label}}
                    </option>
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
              <div class="col-2" v-if='filter.total_from'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'>Desde <strong>S/ {{filter.total_from}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("total_from")'></i>
                </div>
              </div>
              <div class="col-2" v-if='filter.total_to'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'>Hasta <strong>S/ {{filter.total_to}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("total_to")'>
                  </i>
                </div>
              </div>
              <div class="col-2" v-if='filter.create_from'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'>Desde <strong>{{filter.create_from}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("create_from")'></i>
                </div>
              </div>
              <div class="col-2" v-if='filter.create_to'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'>Hasta <strong>{{filter.create_to}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("create_to")'></i>
                </div>
              </div>
              <div class="col-2" v-if='filter.status'>
                <div class="card-body__filters__option" >
                  <p class='card-body__filters__text'><strong>{{getStatus(filter.status).label}}</strong></p>
                  <i class="far fa-times card-body__filters__close"
                  @click='cleanFilter("status")'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table-global  v-on:orderBy="orderBy" nameUrl="order_read_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import DatePicker from 'vue2-datepicker'
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  import filter from '@/mixins/filter'
  export default {
    name: 'orders',
    mixins: [filter],
    components: {
      searchGlobal,
      tableGlobal,
      DatePicker
    },
    data () {
      return {
        isFilter: true,
        showFilter: false,
        headerField: [
          {
            field: 'full_name',
            fieldOrder: 'full_name',
            name: 'Cliente',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'email',
            fieldOrder: 'email',
            name: 'Email',
            col: 'col-3',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'status',
            fieldOrder: 'type_status',
            name: 'Estado',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'total',
            fieldOrder: 'total',
            name: 'Total',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          },
          {
            field: 'fecha',
            fieldOrder: 'created',
            name: 'Fecha',
            col: 'col-2',
            orderBy: true,
            type: 'text'
          }
        ],
        date_to: '',
        date_from: '',
        dataList: {},
        params: {},
        filter: {
          total_to: '',
          total_from: '',
          create_to: '',
          create_from: '',
          status: '',
          field: '',
          orderBy: '',
          fields: 'full_name,email,total,type_status,status,fecha,id',
          search: ''
        },
        status: [
          {
            label: 'En Almacén',
            value: 'AL'
          },
          {
            label: 'En Despacho',
            value: 'DS'
          },
          {
            label: 'Entregado',
            value: 'EG'
          }
        ]
      }
    },
    created () {
      this.getDataList()
    },
    methods: {
      getStatus (st) {
        let result = this.status.filter(x => x.value === st)
        return result[0]
      },
      getDataList () {
        var self = this
        this.axios.get('/order/order/', {
          params: self.filter
        }).then(response => {
          self.$router.push({name: 'order', query: self.filter})
          self.dataList = response.data.results
        })
      },
      changeDateTo (value) {
        if (value) {
          this.filter.create_to = this.formatDate(value)
        } else {
          this.filter.create_to = ''
        }
      },
      changeDateFrom (value) {
        if (value) {
          this.filter.create_from = this.formatDate(value)
        } else {
          this.filter.create_from = ''
        }
      }
    }
  }
</script>
