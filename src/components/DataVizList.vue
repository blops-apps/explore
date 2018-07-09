<template>
  <div class="histogram">
  <histogram :chartData="histogramData" :width="300" :height="300"></histogram>
  <donut :chartData="donutData" :width="300" :height="300"></donut>

  </div>
</template>

<script>
import ColorPicker from '../models/color_picker';

export default {
  computed: {

    donutData() {
      const results = this.$store.getters.histogram(1)
      return   {
        labels: results.keys,
        datasets: [
        {
          data: results.values,
          backgroundColor: ColorPicker(results.values)
        }
        ]
      }
    },
    histogramData() {
      const results = this.$store.state.tableData.categorizedHistogram(0)
      return   {
        labels: results.map(c => c.label),
        datasets: [
        {
          data: results.map(c => c.length()),
          backgroundColor: ColorPicker(results)
        }
        ]
      }
    },
  }
}

</script>
