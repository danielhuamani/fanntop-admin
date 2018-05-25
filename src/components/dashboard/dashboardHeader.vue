<template>
  <div class="row">
    <div class="col-3">
      <div class="card">
        <div class="card-header ">
          <h3 class='card-header__title text-center'>Ingreso Mensual</h3>
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
          <h3 class='card-header__title text-center'>Ingreso Diario</h3>
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
          <h3 class='card-header__title text-center'>Ordenes</h3>
        </div>
        <div class="card-body card-body--dashboard">
          <p class='card-body__dashboard'> {{dashboard.total_order_month}}</p>
          <span class='card-body__date'>{{dashboard.month}}</span>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-header">
          <h3 class='card-header__title text-center'>Productos Despachados</h3>
        </div>
        <div class="card-body card-body--dashboard">
          <p class='card-body__dashboard'>{{dashboard.total_product}}</p>
          <span class='card-body__date'>{{dashboard.day}}</span>
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