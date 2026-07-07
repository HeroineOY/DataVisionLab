import { consoleTransport } from './consoleTransport'
import type { LogEntry, LogLevel, LogTransport } from './types'

export interface Logger {
  debug(message: string, context?: unknown): void
  info(message: string, context?: unknown): void
  warn(message: string, context?: unknown): void
  error(message: string, context?: unknown): void
  history(): LogEntry[]
}

const levelWeight: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

export function createLogger(
  transports: LogTransport[] = [consoleTransport],
  minLevel: LogLevel = 'debug',
): Logger {
  const entries: LogEntry[] = []

  function emit(level: LogLevel, message: string, context?: unknown) {
    if (levelWeight[level] < levelWeight[minLevel]) {
      return
    }

    const entry: LogEntry = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${entries.length}`,
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    }

    entries.unshift(entry)
    entries.splice(20)
    transports.forEach((transport) => transport.write(entry))
  }

  return {
    debug: (message, context) => emit('debug', message, context),
    info: (message, context) => emit('info', message, context),
    warn: (message, context) => emit('warn', message, context),
    error: (message, context) => emit('error', message, context),
    history: () => [...entries],
  }
}
