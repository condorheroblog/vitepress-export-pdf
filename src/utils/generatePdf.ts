import path from 'node:path'
import type { PDFOptions, PuppeteerLaunchOptions } from 'puppeteer'
import { resolveConfig } from 'vitepress'
import puppeteer from 'puppeteer'
import pcolors from 'picocolors'
import hash from 'hash-sum'
import fs from 'fs-extra'
import type { EnhanceApp, UserSorter } from '../configs'

import { createSingleProgress, filterRoute } from '../utils'
import { mergePDF } from './mergePDF'

interface IGeneratePdfOptions {
  root: string
  port: number
  host: string
  outFile: string
  outDir: string
  routePatterns: string[]
  sorter?: UserSorter
  puppeteerLaunchOptions?: PuppeteerLaunchOptions
  pdfOptions?: PDFOptions
  enhanceApp?: EnhanceApp
}

const { yellow, gray } = pcolors
const { join } = path

/**
 * Generate PDF from VitePress dev server.
 * @param param1 IGeneratePdfOptions
 */
export const generatePdf = async ({
  root,
  port,
  host,
  sorter,
  outFile,
  outDir,
  puppeteerLaunchOptions,
  pdfOptions,
  routePatterns,
  enhanceApp,
}: IGeneratePdfOptions) => {
  const { pages, tempDir } = await resolveConfig(root)
  const tempPdfDir = join(tempDir, 'pdf')
  fs.ensureDirSync(tempPdfDir)

  const hashPages = pages.map(page => ({
    path: `/${page.replace(/\.md$/, '.html')}`,
    key: `v-${hash(page)}`,
  }))

  let exportPages = filterRoute(hashPages, routePatterns)

  if (typeof sorter === 'function')
    exportPages = exportPages.sort(sorter)

  const normalizePages = exportPages.map((page) => {
    return {
      url: page.path,
      location: `http://${host}:${port}${page.path}`,
      pagePath: `${tempPdfDir}/${page.key}.pdf`,
    }
  })

  const singleBar = createSingleProgress(`  {spin} Generating {bar} {value} / {total} || ${yellow('{title}')} ${gray('{url}')}`)
  singleBar.start(normalizePages.length, 0)

  const browser = await puppeteer.launch(puppeteerLaunchOptions)

  for (const { location, pagePath, url } of normalizePages) {
    const browserPage = await browser.newPage()
    typeof enhanceApp === 'function' && enhanceApp(browser, browserPage)
    browserPage.setDefaultNavigationTimeout(0)

    await browserPage.goto(
      location,
      { waitUntil: 'networkidle2' },
    )

    await browserPage.pdf({
      path: pagePath,
      format: 'A4',
      ...pdfOptions,
    })

    const title = await browserPage.title()
    browserPage.close()

    singleBar.bar.increment(1, {
      title,
      url,
    })
  }

  singleBar.stop()
  await browser.close()

  await mergePDF(normalizePages, outFile, outDir)

  fs.removeSync(tempPdfDir)
  !fs.readdirSync(tempDir).length && fs.removeSync(tempDir)
}
