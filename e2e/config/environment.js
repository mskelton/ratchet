const PlaywrightEnvironment = require("jest-playwright-preset/lib/PlaywrightEnvironment")
  .default

module.exports = class Environment extends PlaywrightEnvironment {
  async handleTestEvent(event) {
    if (
      event.name === "test_done" &&
      event.test.errors.length > 0 &&
      !this.global.page.isClosed()
    ) {
      const parentName = event.test.parent.name.replace(/\W/g, "-")
      const specName = event.test.name.replace(/\W/g, "-")
      console.log(
        "Uploading screenshot",
        `screenshots/${parentName}_${specName}.png`
      )

      await this.global.page.screenshot({
        path: `screenshots/${parentName}_${specName}.png`,
      })
    }
  }
}
