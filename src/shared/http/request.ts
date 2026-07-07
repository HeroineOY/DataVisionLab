import axios from 'axios'
import { env } from '@/shared/config/env'
import { logger } from '@/shared/logger'

export const request = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
})

request.interceptors.request.use((config) => {
  logger.debug('HTTP request', {
    method: config.method,
    url: config.url,
  })

  return config
})

request.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    logger.error('HTTP request failed', error)
    return Promise.reject(error)
  },
)
