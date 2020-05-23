describe("Input", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080")
  })

  it("", async () => {
    const browser = await page.$eval(".string-major", (el) => el.innerHTML)
    expect(browser).toContain("Chrome")
  })
})
