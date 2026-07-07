import { describe, expect, it } from 'vitest'
import { createLogger } from '@/shared/logger'
import type { LogEntry, LogTransport } from '@/shared/logger'

describe('logger', () => {
  it('writes entries to transports and keeps a local history', () => {
    const entries: LogEntry[] = []
    const transport: LogTransport = {
      write: (entry) => entries.push(entry),
    }
    const logger = createLogger([transport])

    logger.info('unit test log', { source: 'vitest' })

    expect(entries).toHaveLength(1)
    expect(entries[0].message).toBe('unit test log')
    expect(logger.history()[0].level).toBe('info')
  })
})
