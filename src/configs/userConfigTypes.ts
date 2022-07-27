import type { Browser, Page as BrowserPage, PDFOptions, PuppeteerLaunchOptions } from 'puppeteer'

export type EnhanceApp = (browser: Browser, browserPage: BrowserPage) => void
export interface Page {
  key: string
  path: string
}
export type UserSorter = (a: Page, b: Page) => number

/**
 * defined user config
 */
export interface UserConfig {
  sorter?: UserSorter
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  routePatterns?: string[]
  pdfOptions?: PDFOptions
  outFile?: string
  outDir?: string
  enhanceApp?: EnhanceApp
}
