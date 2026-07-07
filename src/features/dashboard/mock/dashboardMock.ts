import type { DashboardData } from '@/features/dashboard/model/dashboard'

export const dashboardMockData: DashboardData = {
  updatedAt: new Date().toISOString(),
  coreMetrics: [
    { label: '累计学习人次', value: 128640, unit: '人次', trend: 18.6, tone: 'cyan' },
    { label: '完成实验项目', value: 4632, unit: '个', trend: 12.4, tone: 'blue' },
    { label: '平均掌握率', value: 86.7, unit: '%', trend: 6.8, tone: 'amber' },
    { label: '课堂活跃指数', value: 94.2, unit: '分', trend: 9.5, tone: 'rose' },
  ],
  learningTrend: [
    { label: '周一', visits: 12600, completions: 7200 },
    { label: '周二', visits: 14200, completions: 8100 },
    { label: '周三', visits: 15800, completions: 9400 },
    { label: '周四', visits: 16900, completions: 10300 },
    { label: '周五', visits: 18100, completions: 11200 },
    { label: '周六', visits: 15400, completions: 9800 },
    { label: '周日', visits: 17600, completions: 12100 },
  ],
  chartUsage: [
    { name: '折线趋势', value: 36 },
    { name: '指标卡片', value: 26 },
    { name: '排行分析', value: 18 },
    { name: '区域分布', value: 12 },
    { name: '状态监控', value: 8 },
  ],
  courseDistribution: [
    { name: '数据采集', value: 68 },
    { name: '数据处理', value: 83 },
    { name: '图表封装', value: 91 },
    { name: '大屏布局', value: 76 },
    { name: '工程规范', value: 64 },
  ],
  ranking: [
    { name: 'Vue 组件化', value: 9840, rate: 98 },
    { name: 'ECharts 实战', value: 8750, rate: 91 },
    { name: 'Mock/API 切换', value: 7620, rate: 86 },
    { name: 'Pinia 状态管理', value: 6810, rate: 78 },
    { name: '测试与质量体系', value: 5930, rate: 69 },
  ],
  regions: [
    { name: '华北', value: 86, x: 58, y: 22 },
    { name: '华东', value: 95, x: 68, y: 48 },
    { name: '华南', value: 79, x: 62, y: 73 },
    { name: '华中', value: 74, x: 50, y: 52 },
    { name: '西南', value: 63, x: 34, y: 66 },
    { name: '西北', value: 57, x: 27, y: 30 },
    { name: '东北', value: 69, x: 76, y: 18 },
  ],
  health: {
    score: 92,
    apiLatency: 38,
    renderFps: 59,
    mockCoverage: 100,
  },
  logs: [
    { level: 'info', message: 'Mock 数据源加载完成', time: '09:20:18' },
    { level: 'info', message: 'ECharts 图表实例初始化', time: '09:20:20' },
    { level: 'warn', message: '地图资源暂用区域散点模拟', time: '09:20:22' },
    { level: 'info', message: '质量检查配置已启用', time: '09:20:25' },
  ],
}

export async function getMockDashboardData(): Promise<DashboardData> {
  await new Promise((resolve) => window.setTimeout(resolve, 220))

  return {
    ...dashboardMockData,
    updatedAt: new Date().toISOString(),
  }
}
