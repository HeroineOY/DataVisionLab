import type { LogEntry, LogTransport } from './types'

export const consoleTransport: LogTransport = {
  write(entry: LogEntry) {
    const payload = [`[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`]

    if (entry.level === 'error') {
      console.error(...payload, entry.context ?? '')
      return
    }

    if (entry.level === 'warn') {
      console.warn(...payload, entry.context ?? '')
      return
    }

    console.info(...payload, entry.context ?? '')
  },
}
