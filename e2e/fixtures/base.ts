import { test as base } from "@playwright/test"

export const test = base.extend({
  page: async ({ baseURL, page }, use) => {
    await page.goto(baseURL!)
    await use(page)
  },
})

export const expect = test.expect
