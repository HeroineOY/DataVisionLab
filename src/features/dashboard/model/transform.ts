import type { CoreMetric, DashboardData } from './dashboard'

export function calculateMetricTotal(metrics: CoreMetric[]) {
  return metrics.reduce((sum, metric) => sum + metric.value, 0)
}

export function getTopRegion(data: DashboardData) {
  return [...data.regions].sort((left, right) => right.value - left.value)[0]
}

export function normalizePercent(value: number, max = 100) {
  return Math.min(Math.max(value, 0), max)
}
