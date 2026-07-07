<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { RegionPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'
import { chartInkTheme } from '@/shared/constants/palette'

const props = defineProps<{
  regions: RegionPoint[]
}>()

type RegionSeriesData = [number, number, number, string]

function readRegionData(data: unknown): RegionSeriesData {
  return data as RegionSeriesData
}

const option = computed<EChartsOption>(() => ({
  tooltip: {
    backgroundColor: chartInkTheme.tooltipBackground,
    borderColor: chartInkTheme.tooltipBorder,
    textStyle: { color: chartInkTheme.text },
    formatter: (params) => {
      const item = Array.isArray(params) ? params[0] : params
      const data = readRegionData(item.data)
      return `${data[3]}：${data[2]}`
    },
  },
  grid: { left: 8, right: 8, top: 8, bottom: 8 },
  xAxis: {
    min: 0,
    max: 100,
    show: false,
  },
  yAxis: {
    min: 0,
    max: 100,
    show: false,
  },
  series: [
    {
      type: 'scatter',
      symbolSize: (value: unknown) => Number(readRegionData(value)[2]) * 0.55,
      data: props.regions.map((item) => [item.x, 100 - item.y, item.value, item.name]),
      label: {
        show: true,
        formatter: (params) => {
          const data = readRegionData(params.data)
          return data[3]
        },
        color: '#ffffff',
        fontWeight: 700,
      },
      itemStyle: {
        color: '#2f8f8a',
        opacity: 0.72,
        shadowBlur: 20,
        shadowColor: 'rgba(47, 143, 138, 0.46)',
      },
    },
    {
      type: 'effectScatter',
      symbolSize: 12,
      rippleEffect: { scale: 5, brushType: 'stroke' },
      data: props.regions
        .filter((item) => item.value >= 80)
        .map((item) => [item.x, 100 - item.y, item.value, item.name]),
      itemStyle: { color: '#b98b4a' },
    },
  ],
}))
</script>
