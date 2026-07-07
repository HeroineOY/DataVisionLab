<template>
  <div ref="chartEl" class="echart-view" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  option: EChartsOption
}>()

const chartEl = ref<HTMLDivElement>()
let chart: echarts.ECharts | undefined
let observer: ResizeObserver | undefined

function renderChart() {
  if (!chartEl.value) {
    return
  }

  chart ??= echarts.init(chartEl.value)
  chart.setOption(props.option, true)
}

onMounted(() => {
  renderChart()

  observer = new ResizeObserver(() => chart?.resize())
  if (chartEl.value) {
    observer.observe(chartEl.value)
  }
})

watch(() => props.option, renderChart, { deep: true })

onBeforeUnmount(() => {
  observer?.disconnect()
  chart?.dispose()
})
</script>

<style scoped>
.echart-view {
  width: 100%;
  height: 100%;
  min-height: 0;
}
</style>
