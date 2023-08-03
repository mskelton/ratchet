import { PlaywrightTestConfig } from "@playwright/test"
import { fileURLToPath } from "node:url"

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: process.env.CI ? "dot" : "list",
  retries: process.env.CI ? 2 : 0,
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn dev",
    cwd: fileURLToPath(new URL("../web/", import.meta.url)),
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
}

export default config
