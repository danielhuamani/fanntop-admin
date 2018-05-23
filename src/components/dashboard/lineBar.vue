<template>
  <canvas id="myChartVencer" height="400"></canvas>
</template>
<script>
import Chart from 'chart.js'

export default {
  name: 'lineBar',
  data () {
    return {

    }
  },
  props: ['dashboard'],
  methods: {
    renderChart: function (dataChart, options) {
      var ctx = document.getElementById('myChartVencer').getContext('2d')
      this._chart = new Chart(ctx, {
          // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: dataChart,

        // Configuration options go here
        options: options
      })
    }
  },
  mounted () {
    const self = this
    this.renderChart({
      labels: self.dashboard.mes_anio,
      datasets: [
        {
          label: 'Mis Ingresos (S/)',
          borderColor: '#007ce2',
          borderWidth: 2,
          data: self.dashboard.sum_total,
          pointBorderColor: '#007ce2',
          pointBackgroundColor: '#007ce2',
          pointRadius: 4,
          pointHoverRadius: 15,
          pointHitRadius: 30,
          pointBorderWidth: 2
        }
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function (tooltipItems, data) {
            return 'S/' + tooltipItems.yLabel.toString()
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function (value, index, values) {
              return 'S/' + value
            }
          }
        }]
      }

    })
  },
  beforeDestroy () {
    if (this._chart) {
      // this._chart.destroy()
      this._chart.destroy()
    }
  }
}
</script>