<template>

  <div class="">
    <dashboardHeader class=""></dashboardHeader>
    <div class="row">
      <dashboardSales ></dashboardSales>
      <dahsboardOrderCount ></dahsboardOrderCount>
      <div class='col-3'>
        <div class="card card--margin">
          <div class="card-header">
            <h3 class="card-header__title text-center">Skus Activos</h3>
          </div>
          <div class="card-body card-body--dashboard">
            <p class='card-body__dashboard'>{{dashboard.skus}}</p>
          </div>
        </div>
      </div>
      <div class='col-3'>
        <div class="card card--margin">
          <div class="card-header">
            <h3 class="card-header__title text-center">Cupones Activos</h3>
          </div>
          <div class="card-body card-body--dashboard">
            <p class='card-body__dashboard'>{{dashboard.coupon}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import dashboardFooter from '@/components/dashboard/dashboardFooter'
  import dashboardSales from '@/components/dashboard/dashboardSales'
  import dashboardHeader from '@/components/dashboard/dashboardHeader'
  import dahsboardOrderCount from '@/components/dashboard/dahsboardOrderCount'
  export default {
    data () {
      return {
        dashboard: {
          skus: 0,
          coupon: 0
        }
      }
    },
    name: 'dashboard',
    components: {
      dashboardHeader,
      dashboardSales,
      dahsboardOrderCount,
      dashboardFooter
    },
    created () {
      this.getDashboardFooter()
    },
    methods: {
      getDashboardFooter () {
        const self = this
        this.axios({
          method: 'get',
          url: '/order/order-dashboard-footer/'
        }).then(response => {
          self.dashboard = response.data
        })
      }
    }
  }
</script>