<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import EChartView from '@/shared/components/EChartView.vue'

const props = defineProps<{
  score: number
}>()

const option = computed<EChartsOption>(() => ({
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      progress: {
        show: true,
        width: 14,
        itemStyle: { color: '#2f8f8a' },
      },
      axisLine: {
        lineStyle: {
          width: 14,
          color: [[1, 'rgba(31, 50, 64, 0.12)']],
        },
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
      detail: {
        valueAnimation: true,
        formatter: '{value}分',
        color: '#0f1f2b',
        fontSize: 26,
        fontFamily: 'Roboto Mono, Consolas, monospace',
        offsetCenter: [0, '8%'],
      },
      data: [{ value: props.score }],
    },
  ],
}))
</script>
