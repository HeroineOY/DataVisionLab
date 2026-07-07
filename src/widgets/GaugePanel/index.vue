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
        itemStyle: { color: '#2dd4bf' },
      },
      axisLine: {
        lineStyle: {
          width: 14,
          color: [[1, 'rgba(148, 163, 184, 0.16)']],
        },
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
      detail: {
        valueAnimation: true,
        formatter: '{value}分',
        color: '#f8fbff',
        fontSize: 26,
        offsetCenter: [0, '8%'],
      },
      data: [{ value: props.score }],
    },
  ],
}))
</script>
