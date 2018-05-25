<template>
  <div :class='[expand ? "col-12": "col-6"]'>
    <div class="card card--margin">
      <div class="card-header text-center">
          <h5 class="card-header__title">Cantidad de Pedidos</h5>
          <i class='icon_expand fa fa-expand-alt' @click='expand=!expand'>
          </i>
      </div>
      <div class="card-body">
        </div>
        <div class="row">
          <div class="col-12">
            <bar :dashboard='reporte' v-if='load'></bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bar from '@/components/dashboard/bar'
export default {
  name: 'dahsboardOrderCount',
  data () {
    return {
      expand: false,
      reporte: '',
      load: false,
      create: '',
      filter: {
        create_to: '',
        create_from: ''
      }
    }
  },
  components: {
    bar
  },
  created () {
    this.filter.create_to = this.formatDate(new Date())
    this.filter.create_from = this.formatDate(this.getInitialMonth())
    this.create = [this.getInitialMonth(), new Date()]
    this.getDashboard()
  },
  methods: {
    getInitialMonth () {
      var CurrentDate = new Date()
      CurrentDate.setMonth(CurrentDate.getMonth() - 4)
      CurrentDate.setDate(1)
      return CurrentDate
    },
    getDashboard () {
      const self = this
      self.load = false
      this.axios({
        method: 'get',
        url: '/order/order-dashboard-count/',
        params: self.filter
      }).then(response => {
        self.reporte = response.data
        self.load = true
      })
    },
    changeDate (value) {
      if (value) {
        this.filter.create_from = this.formatDate(value[0])
        this.filter.create_to = this.formatDate(value[1])
      } else {
        this.filter.create_to = ''
        this.filter.create_from = ''
      }
      this.getDashboard()
    },
    formatDate (date) {
      var year = date.getFullYear().toString()
      var month = (date.getMonth() + 101).toString().substring(1)
      var day = (date.getDate() + 100).toString().substring(1)
      return day + '/' + month + '/' + year
    }
  }

}
</script>