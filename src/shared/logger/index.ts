import { env } from '@/shared/config/env'
import { createLogger } from './logger'
import type { LogLevel } from './types'

export const logger = createLogger(undefined, env.logLevel as LogLevel)

export type { LogEntry, LogLevel, LogTransport } from './types'
export { createLogger }
