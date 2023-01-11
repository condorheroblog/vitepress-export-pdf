import path from 'node:path'
import { createServer as createDevApp } from 'vitepress'
import debug from 'debug'
import pkg from '../package.json'
import type { UserConfig } from './configs'

import { checkEnv, generatePdf, logger, timeTransformer } from './utils'
import { loadModule, resolveUserConfigConventionalPath, resolveUserConfigPath } from './configs'

const { join } = path

interface CommandOptions {
  config?: string
  outDir?: string
  outFile?: string
  debug?: boolean
}

const devDebug = debug('vitepress-export-pdf:dev-server')

export const serverApp = async (dir = 'docs', commandOptions: CommandOptions = {}) => {
  checkEnv(pkg.engines.node)

  const sourceDir = join(process.cwd(), dir)

  if (commandOptions.debug)
    debug.enabled('vitepress-export-pdf:*')

  devDebug('sourceDir: %s', sourceDir)

  let userConfig: UserConfig = {}

  // resolve user config file
  const userConfigPath = commandOptions.config
    ? resolveUserConfigPath(commandOptions.config)
    : resolveUserConfigConventionalPath(sourceDir)

  if (userConfigPath)
    userConfig = await loadModule(userConfigPath)

  // set default routePatterns
  if (Array.isArray(userConfig.routePatterns))
    userConfig.routePatterns = ['/**', '!/404.html', ...userConfig.routePatterns]
  else
    userConfig.routePatterns = ['/**', '!/404.html']

  const vitepressOutFile = commandOptions.outFile ?? `vitepress-${timeTransformer()}.pdf`
  const vitepressOutDir = commandOptions.outDir ?? '.'

  devDebug('userConfig: %O', userConfig)

  const {
    sorter,
    puppeteerLaunchOptions,
    pdfOptions,
    outFile = vitepressOutFile.endsWith('.pdf') ? vitepressOutFile : `${vitepressOutFile}.pdf`,
    outDir = vitepressOutDir,
    routePatterns,
    enhanceApp,
  } = userConfig

  // TODO: ServerOptions
  const devServer = await createDevApp(sourceDir, {})

  const port = Number(devServer.config.preview.host)
  const servePort = Number.isFinite(port) ? port : 16762
  const host = devServer.config.preview.host
  const serveHost = typeof host === 'string' ? host : 'localhost'

  const devApp = await devServer.listen(servePort)
  devApp.printUrls()

  logger.log('\n')
  logger.tip('Start to generate current site to PDF ...\n')

  try {
    await generatePdf({
      root: devApp.config.root,
      host: serveHost,
      port: servePort,
      base: devServer.config.base,
      outFile,
      outDir,
      sorter,
      puppeteerLaunchOptions,
      pdfOptions,
      routePatterns,
      enhanceApp,
    })
  }
  catch (error) {
    logger.error(error)
  }

  // close current dev server
  await devApp.close()
  process.exit(0)
}
