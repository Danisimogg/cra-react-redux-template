/* global describe, beforeAll, afterAll, test, expect */

const { launchBrowser } = require('./utils')

describe('Main page correct render', () => {
  let browser
  let page

  beforeAll(async () => {
    const launchBrowserResult = await launchBrowser()
    browser = launchBrowserResult.browser
    page = launchBrowserResult.page
  })

  afterAll(async () => {
    await browser.close()
    browser = null
    page = null
  })

  test('Should open main page', async () => {
    await page.goto('http://localhost:3000/')

    await page.waitForSelector('.main')
    /**
     * @see https://pptr.dev/#?product=Puppeteer&version=v1.16.0&show=api-pageevalselector-pagefunction-args-1
     */
    const result = await page.$eval('.main', ({ innerText }) => innerText)

    expect(result).toBe('Main')
  }, 60000)

  test('Should switch to catalog page', async () => {
    await page.goto('http://localhost:3000/')

    const menuCatalogSelector = '[data-test-id="main-menu__item_catalog"]'
    await page.waitForSelector(menuCatalogSelector)
    await page.click(menuCatalogSelector)

    const catalogRouteSelector = '[data-test-id="catalog-route__header"]'
    await page.waitForSelector(catalogRouteSelector)

    const result = await page.$eval(catalogRouteSelector, ({ innerText }) => innerText)

    expect(result).toBe('Catalog Route')
  }, 60000)

})
