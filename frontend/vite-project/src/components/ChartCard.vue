<template>
  <div class="chart-card">
    <h3>{{ title }}</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  title: String,
  type: String,
  data: Object,
  options: Object
})

const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: props.type || 'line',
      data: props.data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        ...props.options
      }
    })
  }
})

watch(() => props.data, (newData) => {
  if (chartInstance) {
    chartInstance.data = newData
    chartInstance.update()
  }
}, { deep: true })
</script>

<style scoped>
.chart-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin-bottom: 15px;
  color: var(--text-dark);
  font-size: 16px;
  font-weight: 600;
}

canvas {
  max-height: 300px;
}

@media (max-width: 768px) {
  .chart-card {
    padding: 16px;
  }
  
  .chart-card h3 {
    font-size: 15px;
    margin-bottom: 12px;
  }
  
  canvas {
    max-height: 250px;
  }
}

@media (max-width: 640px) {
  .chart-card {
    padding: 14px;
  }
  
  .chart-card h3 {
    font-size: 14px;
  }
  
  canvas {
    max-height: 220px;
  }
}
</style>
