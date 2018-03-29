<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Ordenes</h3>
        <div class="material content d-flex">
            <div class="col-4 content__field">
                <label for="">Departamento</label>
                <select name="" id="" class="form-control" v-model='departamento_select' @change='getProvincias()'>
                    <option value=""  >Seleccione Departamento</option>
                    <option :value="departamento.codigo"  v-for='departamento in departamentos' v-if='departamentos.length > 0'>
                        {{departamento.descripcion}}
                    </option>
                </select>
            </div>
            <div class="col-4 content__field">
                <label for="">Provincia</label>
                <select name="" id="" class="form-control" v-model='provincia_select'  @change='getDistritos()'>
                    <option value="">Seleccione Provincia</option>
                    <option :value="provincia.codigo" v-for='provincia in provincias' v-if='provincias.length > 0'>
                        {{provincia.descripcion}}
                    </option>
                </select>
            </div>
        </div>
        <search-global class='content' ></search-global>
        <table-global  v-on:orderBy="orderBy" nameUrl="shipping_cost_update" :headerField="headerField" :tablaDataList="dataList" ></table-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  import tableGlobal from '@/componentsGlobals/table'
  export default {
    name: 'shippingCost',
    components: {
      searchGlobal,
      tableGlobal
    },
    data () {
      return {
        headerField: [
          {
            field: 'price',
            name: 'Precio',
            col: 'col-5',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          },
          {
            field: 'full_ubigeo',
            name: 'Ubigeo',
            col: 'col-5',
            orderBy: true,
            is_boolean: false,
            type: 'text'
          }
        ],
        dataList: {},
        params: {},
        departamentos: [],
        departamento_select: '',
        provincia_select: '',
        provincias: []
      }
    },
    created () {
      this.getShippingCost()
      this.getDepartamentos()
    },
    methods: {
      getShippingCost () {
        var self = this
        this.axios.get('/shipping/shipping-cost/', {
          params: self.params
        }).then(response => {
          self.dataList = response.data
        })
      },
      getDepartamentos () {
        var self = this
        this.axios.get('/ubigeo/departamentos/', {
        }).then(response => {
          self.departamentos = response.data.departamentos
        })
      },
      getProvincias () {
        var self = this
        let idDepartamento = self.departamento_select
        console.log(idDepartamento, '---')
        if (idDepartamento) {
          this.axios.get('/ubigeo/provincias/', {
            params: {
              departamento: idDepartamento
            }
          }).then(response => {
            self.provincias = response.data.provincias
          })
        } else {
          self.provincias = []
        }
      },
      getDistritos () {
        var self = this
        let idProvincia = self.provincia_select
        console.log(idProvincia, 'idProvincia')
        if (idProvincia) {
          self.params['provincia'] = idProvincia
          self.params['get_distritos'] = true
          self.orderBy()
        } else {
          self.params['provincia'] = ''
          self.params['get_distritos'] = false
          self.orderBy()
        }
      },
      orderBy () {
        console.log(this.params, '-')
        this.$router.push({name: 'shipping_cost', query: this.params})
        this.getShippingCost()
      }
    }
  }
</script>
