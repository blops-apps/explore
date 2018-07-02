<template>
  <div>
    <b-table striped hover :items="sampleData"></b-table>
  </div>
</template>

<script>

export default {
  computed: {
    sampleData() {
      return this.$store.state.tableData.dataLines.slice(0, 100)
    }
  }
}
</script>
