import type { LogEntry, LogTransport } from './types'

export class RemoteLogTransport implements LogTransport {
  write(entry: LogEntry): void {
    void entry
    // Reserved for future API reporting after VITE_DATA_SOURCE switches to api.
  }
}
