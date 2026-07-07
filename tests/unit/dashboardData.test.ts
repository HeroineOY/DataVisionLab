import { describe, expect, it } from 'vitest'
import { dashboardMockData } from '@/features/dashboard/mock/dashboardMock'
import {
  calculateMetricTotal,
  getTopRegion,
  normalizePercent,
} from '@/features/dashboard/model/transform'

describe('dashboard data transforms', () => {
  it('calculates the total value of core metrics', () => {
    expect(calculateMetricTotal(dashboardMockData.coreMetrics)).toBeGreaterThan(100_000)
  })

  it('returns the strongest region and clamps percent values', () => {
    expect(getTopRegion(dashboardMockData).name).toBe('华东')
    expect(normalizePercent(126)).toBe(100)
    expect(normalizePercent(-8)).toBe(0)
  })
})
