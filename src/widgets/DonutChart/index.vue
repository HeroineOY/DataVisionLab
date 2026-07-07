<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { CategoryPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'
import { chartPalette } from '@/shared/constants/palette'

const props = defineProps<{
  items: CategoryPoint[]
}>()

const option = computed<EChartsOption>(() => ({
  color: chartPalette,
  tooltip: { trigger: 'item' },
  legend: {
    bottom: 0,
    left: 'center',
    textStyle: { color: '#b9c7dc' },
  },
  series: [
    {
      name: '图表类型',
      type: 'pie',
      radius: ['46%', '70%'],
      center: ['50%', '43%'],
      avoidLabelOverlap: true,
      label: {
        color: '#d9e7ff',
        formatter: '{b}\n{d}%',
      },
      data: props.items,
    },
  ],
}))
</script>
