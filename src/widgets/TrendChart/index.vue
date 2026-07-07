<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { TrendPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'

const props = defineProps<{
  points: TrendPoint[]
}>()

const option = computed<EChartsOption>(() => ({
  color: ['#2dd4bf', '#f59e0b'],
  tooltip: { trigger: 'axis' },
  legend: {
    top: 0,
    right: 4,
    textStyle: { color: '#b9c7dc' },
  },
  grid: { left: 36, right: 18, top: 42, bottom: 28 },
  xAxis: {
    type: 'category',
    data: props.points.map((item) => item.label),
    axisLine: { lineStyle: { color: '#36506f' } },
    axisLabel: { color: '#a8bbd4' },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.14)' } },
    axisLabel: { color: '#a8bbd4' },
  },
  series: [
    {
      name: '访问人次',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      areaStyle: { opacity: 0.18 },
      data: props.points.map((item) => item.visits),
    },
    {
      name: '完成实验',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      areaStyle: { opacity: 0.12 },
      data: props.points.map((item) => item.completions),
    },
  ],
}))
</script>
