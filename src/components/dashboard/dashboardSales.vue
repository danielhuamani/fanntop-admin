<template>
  <div :class='[expand ? "col-12": "col-6"]'>
    <div class="card card--margin">
      <div class="card-header text-center">
        <h3 class="card-header__title">Mis Ingresos</h3>
        <i class='icon_expand fa fa-expand-alt' @click='expand=!expand'>

        </i>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <lineBar :dashboard='dashboard' v-if='load'></lineBar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import lineBar from '@/components/dashboard/lineBar'
  export default {
    name: 'dashboardSales',
    components: {
      lineBar
    },
    created () {
      this.filter.create_to = this.formatDate(new Date())
      this.filter.create_from = this.formatDate(this.getInitialMonth())
      this.create = [this.getInitialMonth(), new Date()]
      this.getDashboardSales()
    },
    data () {
      return {
        expand: false,
        create: '',
        shortcuts: [
          {
            text: 'Hoy',
            start: new Date(),
            end: new Date()
          }
        ],
        dashboard: {},
        load: false,
        filter: {
          create_to: '',
          create_from: ''
        }
      }
    },
    methods: {
      getInitialMonth () {
        var CurrentDate = new Date()
        CurrentDate.setMonth(CurrentDate.getMonth() - 4)
        CurrentDate.setDate(1)
        return CurrentDate
      },
      getDashboardSales () {
        const self = this
        self.load = false
        this.axios({
          method: 'get',
          url: '/order/order-dashboard-sales/',
          params: self.filter
        }).then(response => {
          self.dashboard = response.data
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
        this.getDashboardSales()
      },
      changeDateFrom (value) {
        console.log(value, 'value')
        if (value) {
          this.filter.create_from = this.formatDate(value)
        } else {
          this.filter.create_from = ''
        }
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