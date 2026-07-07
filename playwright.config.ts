import { defineConfig, devices } from '@playwright/test'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const localChromium = join(
  process.env.LOCALAPPDATA ?? '',
  'ms-playwright',
  'chromium-1228',
  'chrome-win64',
  'chrome.exe',
)

const localLaunchOptions = existsSync(localChromium)
  ? {
      executablePath: localChromium,
    }
  : undefined

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm.cmd run dev -- --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: localLaunchOptions,
      },
    },
  ],
})
