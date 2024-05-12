/**
 * press-export-pdf cli
 */

import type { CAC } from '@condorhero/vuepress-plugin-export-pdf-core'
import { runCli, systemInfo } from '@condorhero/vuepress-plugin-export-pdf-core'
import { serverApp } from '..'

export function registerCommands(program: CAC) {
  // register `export` command
  program
    .command('export [sourceDir]', 'Export current VitePress site to a PDF file(default: docs)')
    .allowUnknownOptions()
    .option('-c, --config <config>', 'Set path to config file')
    .option('--outFile <outFile>', 'Name of output file')
    .option('--outDir <outDir>', 'Directory of output files')
    .option('--pdfOutlines <pdfOutlines>', 'Keep PDF outlines/bookmarks')
    .option('--urlOrigin <urlOrigin>', 'Change the origin of the print url(Option displayHeaderFooter of pdfOptions is true)')
    .option('--debug', 'Enable debug mode')
    .action(serverApp)

  // register `info` command
  program
    .command('info', 'Display environment information')
    .action(() => {
      systemInfo(['vitepress'])
    })
}

runCli('press-export-pdf')(registerCommands)
