<template>
  <div class="row">
    <div class="col-3">
      <div class="card">
        <div class="card-header">
          <h3 class='card-header__title'>Ingreso Mensual</h3>
        </div>
        <div class="card-body card-body--dashboard">
          <p class='card-body__dashboard'>S/ {{dashboard.total_sales_month}}</p>
          <span class='card-body__date'>{{dashboard.month}}</span>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-header">
          <h3 class='card-header__title'>Ingreso Diario</h3>
        </div>
        <div class="card-body card-body--dashboard">
          <p class='card-body__dashboard'>S/ {{dashboard.total_sales_date}}</p>
          <span class='card-body__date'>{{dashboard.day}}</span>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-header">
          <h3 class='card-header__title'>Ordenes</h3>
        </div>
        <div class="card-body card-body--dashboard">
          <p class='card-body__dashboard'>S/ {{dashboard.total_order_month}}</p>
          <span class='card-body__date'>{{dashboard.month}}</span>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-header">
          <h3 class='card-header__title'>Productos Despachados</h3>
        </div>
        <div class="card-body card-body--dashboard">
          <p class='card-body__dashboard'>S/ 120</p>
          <span class='card-body__date'>01/05/2018</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'dashboardHeader',
    created () {
      this.getDashboardHeader()
    },
    data () {
      return {
        dashboard: {
          total_sales_month: 0,
          total_sales_date: 0,
          total_order_month: 0,
          total_product: 0,
          month: '',
          day: ''
        },
        load: true
      }
    },
    methods: {
      getDashboardHeader () {
        const self = this
        this.axios({
          method: 'get',
          url: '/order/order-dashboard-header/'
        }).then(response => {
          self.dashboard = response.data
        })
      }
    }
  }
</script>