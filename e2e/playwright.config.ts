import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "dot" : "line",
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.ENVIRONMENT_URL || "http://localhost:8080",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
}

export default config
