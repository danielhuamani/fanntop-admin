<template>
  <canvas id="myChartOrderCount" height="400"></canvas>
</template>
<script>
import Chart from 'chart.js'
export default {
  name: 'BarDashboard',
  data () {
    return {

    }
  },
  props: ['dashboard'],
  methods: {
    renderChart: function (dataChart, options) {
      var ctx = document.getElementById('myChartOrderCount').getContext('2d')
      this._chart = new Chart(ctx, {
          // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: dataChart,

        // Configuration options go here
        options: options
      })
    }
  },
  mounted () {
    const self = this
    var data
    var color = ['#699000', '#FB5660', '#65799B', '#545561', '#333538', '#699000']
    var dataSet = Object.keys(self.dashboard.reporte).map(function (value, index) {
      data = {
        label: self.dashboard.reporte[value]['name'],
        backgroundColor: color[index],
        data: [self.dashboard.reporte[value]['total']]
      }
      return data
    })
    this.renderChart(
      {
        labels: [self.dashboard.mes_anio],
        datasets: dataSet
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales:
        {
          xAxes: [{ barPercentage: 0.2 }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return value + 'Unid'
              }
            }
          }]
        }
      }
    )
  },
  beforeDestroy () {
    if (this._chart) {
      // this._chart.destroy()
      this._chart.destroy()
    }
  }
}
</script>