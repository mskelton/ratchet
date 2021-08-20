import { PlaywrightTestConfig } from "@playwright/test"
import * as path from "path"

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "dot" : "list",
  retries: process.env.CI ? 2 : 0,
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn serve",
    cwd: path.resolve(__dirname, "../web"),
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
}

export default config
