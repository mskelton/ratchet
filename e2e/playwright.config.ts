import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: 2,
  use: {
    baseURL: process.env.ENVIRONMENT_URL || "http://localhost:8080",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
}

export default config
