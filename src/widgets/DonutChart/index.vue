<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { CategoryPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'
import { chartInkTheme, chartPalette } from '@/shared/constants/palette'

const props = defineProps<{
  items: CategoryPoint[]
}>()

const option = computed<EChartsOption>(() => ({
  color: chartPalette,
  tooltip: {
    trigger: 'item',
    backgroundColor: chartInkTheme.tooltipBackground,
    borderColor: chartInkTheme.tooltipBorder,
    textStyle: { color: chartInkTheme.text },
  },
  legend: {
    bottom: 0,
    left: 'center',
    textStyle: { color: chartInkTheme.mutedText, fontWeight: 600 },
  },
  series: [
    {
      name: '图表类型',
      type: 'pie',
      radius: ['46%', '70%'],
      center: ['50%', '43%'],
      avoidLabelOverlap: true,
      label: {
        color: chartInkTheme.text,
        formatter: '{b}\n{d}%',
      },
      itemStyle: {
        borderColor: 'rgba(255, 252, 242, 0.7)',
        borderWidth: 2,
      },
      data: props.items,
    },
  ],
}))
</script>
