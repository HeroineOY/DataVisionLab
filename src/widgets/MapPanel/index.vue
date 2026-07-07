<template>
  <EChartView :option="option" />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { RegionPoint } from '@/features/dashboard/model/dashboard'
import EChartView from '@/shared/components/EChartView.vue'

const props = defineProps<{
  regions: RegionPoint[]
}>()

type RegionSeriesData = [number, number, number, string]

function readRegionData(data: unknown): RegionSeriesData {
  return data as RegionSeriesData
}

const option = computed<EChartsOption>(() => ({
  tooltip: {
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
        color: '#f8fbff',
        fontWeight: 700,
      },
      itemStyle: {
        color: '#2dd4bf',
        opacity: 0.72,
        shadowBlur: 18,
        shadowColor: '#2dd4bf',
      },
    },
    {
      type: 'effectScatter',
      symbolSize: 12,
      rippleEffect: { scale: 5, brushType: 'stroke' },
      data: props.regions
        .filter((item) => item.value >= 80)
        .map((item) => [item.x, 100 - item.y, item.value, item.name]),
      itemStyle: { color: '#f59e0b' },
    },
  ],
}))
</script>
