import { request } from '@/shared/http/request'
import { isMockMode } from '@/shared/config/env'
import type { DashboardData } from '@/features/dashboard/model/dashboard'
import { getMockDashboardData } from '@/features/dashboard/mock/dashboardMock'

export async function getDashboardData(): Promise<DashboardData> {
  if (isMockMode()) {
    return getMockDashboardData()
  }

  const response = await request.get<DashboardData>('/dashboard')
  return response.data
}
