export type DataSource = 'mock' | 'api'

export const env = {
  dataSource: (import.meta.env.VITE_DATA_SOURCE ?? 'mock') as DataSource,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  logLevel: import.meta.env.VITE_LOG_LEVEL ?? 'debug',
}

export function isMockMode() {
  return env.dataSource === 'mock'
}
