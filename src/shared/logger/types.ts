export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  id: string
  level: LogLevel
  message: string
  timestamp: string
  context?: unknown
}

export interface LogTransport {
  write(entry: LogEntry): void
}
