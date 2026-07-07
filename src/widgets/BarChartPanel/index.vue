<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { CategoryPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'
import { chartInkTheme } from '@/shared/constants/palette'

const props = defineProps<{
  items: CategoryPoint[]
}>()

const option = computed<EChartsOption>(() => ({
  color: ['#5d9ab2'],
  tooltip: {
    trigger: 'axis',
    backgroundColor: chartInkTheme.tooltipBackground,
    borderColor: chartInkTheme.tooltipBorder,
    textStyle: { color: chartInkTheme.text },
  },
  grid: { left: 36, right: 14, top: 18, bottom: 42 },
  xAxis: {
    type: 'category',
    data: props.items.map((item) => item.name),
    axisLabel: { color: chartInkTheme.mutedText, interval: 0 },
    axisLine: { lineStyle: { color: chartInkTheme.axisLine } },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: chartInkTheme.splitLine } },
    axisLabel: { color: chartInkTheme.mutedText },
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
            { offset: 0, color: '#79b8c7' },
            { offset: 0.72, color: '#5d9ab2' },
            { offset: 1, color: '#25485f' },
          ],
        },
      },
    },
  ],
}))
</script>
