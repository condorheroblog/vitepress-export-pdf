import path from 'node:path'
import fs from 'fs-extra'
import pcolors from 'picocolors'
import pdf from 'pdfjs'

import { logger } from '.'

const { yellow } = pcolors

interface IPage {
  location: string
  pagePath: string
  url: string
}

/**
 * Merge PDFs.
 * @param pages - Pages
 * @param outFile - Output file
 * @param outDir - Output directory
 */
export const mergePDF = async (pages: IPage[], outFile: string, outDir: string) => {
  await new Promise((resolve) => {
    const mergedPdf = new pdf.Document()

    pages
      .map(({ pagePath }) => fs.readFileSync(pagePath))
      .forEach((file) => {
        const page = new pdf.ExternalDocument(file)
        mergedPdf.addPagesOf(page)
      })

    mergedPdf.asBuffer((err, data) => {
      if (err) {
        throw err
      }
      else {
        const saveDirPath = path.join(process.cwd(), outDir)
        outDir && fs.ensureDirSync(saveDirPath)
        const saveFilePath = path.join(saveDirPath, outFile)
        fs.writeFileSync(saveFilePath, data, { encoding: 'binary' })

        const relativePath = path.relative(process.cwd(), saveFilePath)
        logger.success(`Export ${yellow(relativePath)} file!`)
        resolve(true)
      }
    })
  })
}
