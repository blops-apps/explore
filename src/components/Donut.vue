<script>
import { Doughnut, mixins } from 'vue-chartjs'

export default {
	extends: Doughnut,
	mixins: [mixins.reactiveProp],
	props: ['chartData'],
	mounted () {
		this.renderChart(this.chartData, {
			maintainAspectRatio: false
		})
	}
}
</script>
