export interface CoreMetric {
  label: string
  value: number
  unit: string
  trend: number
  tone: 'cyan' | 'blue' | 'amber' | 'rose'
}

export interface TrendPoint {
  label: string
  visits: number
  completions: number
}

export interface CategoryPoint {
  name: string
  value: number
}

export interface RankingItem {
  name: string
  value: number
  rate: number
}

export interface RegionPoint {
  name: string
  value: number
  x: number
  y: number
}

export interface SystemLogSummary {
  level: 'info' | 'warn' | 'error'
  message: string
  time: string
}

export interface DashboardData {
  updatedAt: string
  coreMetrics: CoreMetric[]
  learningTrend: TrendPoint[]
  chartUsage: CategoryPoint[]
  courseDistribution: CategoryPoint[]
  ranking: RankingItem[]
  regions: RegionPoint[]
  health: {
    score: number
    apiLatency: number
    renderFps: number
    mockCoverage: number
  }
  logs: SystemLogSummary[]
}
