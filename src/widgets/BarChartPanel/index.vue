<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { CategoryPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'

const props = defineProps<{
  items: CategoryPoint[]
}>()

const option = computed<EChartsOption>(() => ({
  color: ['#60a5fa'],
  tooltip: { trigger: 'axis' },
  grid: { left: 36, right: 14, top: 18, bottom: 42 },
  xAxis: {
    type: 'category',
    data: props.items.map((item) => item.name),
    axisLabel: { color: '#a8bbd4', interval: 0 },
    axisLine: { lineStyle: { color: '#36506f' } },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.14)' } },
    axisLabel: { color: '#a8bbd4' },
  },
  series: [
    {
      type: 'bar',
      barWidth: 18,
      data: props.items.map((item) => item.value),
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#7dd3fc' },
            { offset: 1, color: '#2563eb' },
          ],
        },
      },
    },
  ],
}))
</script>
