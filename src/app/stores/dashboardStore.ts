import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getDashboardData } from '@/features/dashboard/api/dashboardApi'
import type { DashboardData } from '@/features/dashboard/model/dashboard'
import { logger } from '@/shared/logger'

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref<DashboardData>()
  const loading = ref(false)
  const error = ref<string>()

  const coreMetrics = computed(() => data.value?.coreMetrics ?? [])
  const hasData = computed(() => Boolean(data.value))

  async function loadDashboard() {
    loading.value = true
    error.value = undefined

    try {
      data.value = await getDashboardData()
      logger.info('Dashboard data loaded', { metrics: data.value.coreMetrics.length })
    } catch (cause) {
      error.value = '数据加载失败'
      logger.error('Dashboard data loading failed', cause)
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    coreMetrics,
    hasData,
    loadDashboard,
  }
})
