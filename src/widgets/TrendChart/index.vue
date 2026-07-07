<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { TrendPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'
import { chartInkTheme } from '@/shared/constants/palette'

const props = defineProps<{
  points: TrendPoint[]
}>()

const option = computed<EChartsOption>(() => ({
  color: ['#2f8f8a', '#b98b4a'],
  tooltip: {
    trigger: 'axis',
    backgroundColor: chartInkTheme.tooltipBackground,
    borderColor: chartInkTheme.tooltipBorder,
    textStyle: { color: chartInkTheme.text },
  },
  legend: {
    top: 0,
    right: 4,
    textStyle: { color: chartInkTheme.mutedText, fontWeight: 600 },
  },
  grid: { left: 36, right: 18, top: 42, bottom: 28 },
  xAxis: {
    type: 'category',
    data: props.points.map((item) => item.label),
    axisLine: { lineStyle: { color: chartInkTheme.axisLine } },
    axisTick: { show: false },
    axisLabel: { color: chartInkTheme.mutedText },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: chartInkTheme.splitLine } },
    axisLabel: { color: chartInkTheme.mutedText },
  },
  series: [
    {
      name: '访问人次',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: { width: 3 },
      areaStyle: { color: 'rgba(47, 143, 138, 0.12)' },
      data: props.points.map((item) => item.visits),
    },
    {
      name: '完成实验',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      lineStyle: { width: 2 },
      areaStyle: { color: 'rgba(185, 139, 74, 0.1)' },
      data: props.points.map((item) => item.completions),
    },
  ],
}))
</script>
