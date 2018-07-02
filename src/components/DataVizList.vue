<template>
  <div class="histogram">
  <donut :chartData="sampleData" :width="300" :height="300"></donut>
  <histogram :chartData="sampleData" :width="300" :height="300"></histogram>
  </div>
</template>

<script>
export default {
  computed: {
    sampleData() {
      return   {
        labels: this.$store.getters.histogram(1).keys,
        datasets: [
        {
          data: this.$store.getters.histogram(1).values,
          backgroundColor: ['teal', 'orange', 'blue']
        }
        ]
      }
    }
  }
}
</script>
