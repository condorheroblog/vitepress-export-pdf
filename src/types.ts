import type { LaunchOptions, PDFOptions, Page } from '@condorhero/vuepress-plugin-export-pdf-core'

export type PageType = Omit<Page, 'title'>
export type UserSorter = (a: PageType, b: PageType) => number

/**
 * defined user config
 */
export interface UserConfig {
  sorter?: UserSorter
  puppeteerLaunchOptions?: LaunchOptions
  routePatterns?: string[]
  pdfOptions?: PDFOptions
  outFile?: string
  outDir?: string
  pdfOutlines?: boolean
  urlOrigin?: string
  outlineContainerSelector?: string
}
