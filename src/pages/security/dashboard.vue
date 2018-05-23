<template>

  <div class="">
    <dashboardHeader class=""></dashboardHeader>
    <div class="row">
      <dashboardSales ></dashboardSales>
      <dahsboardOrderCount ></dahsboardOrderCount>
    </div>
  </div>

</template>
<script>
  import dashboardSales from '@/components/dashboard/dashboardSales'
  import dashboardHeader from '@/components/dashboard/dashboardHeader'
  import dahsboardOrderCount from '@/components/dashboard/dahsboardOrderCount'
  export default {
    name: 'dashboard',
    components: {
      dashboardHeader,
      dashboardSales,
      dahsboardOrderCount
    }
  }
</script>