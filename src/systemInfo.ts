import pcolors from 'picocolors'
import envinfo from 'envinfo'
import ora from 'ora'

import { logger } from './utils'

/**
 * Display environment information.
 */
export const systemInfo = async (): Promise<void> => {
  const spinner = ora()
  spinner.start(pcolors.bold('\nCollecting Environment Info:'))

  const result = await envinfo.run(
    {
      System: ['OS', 'CPU', 'Memory', 'Shell'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Utilities: ['Git'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmPackages: [
        'vitepress',
      ],
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true,
    },
  )
  spinner.stop()

  logger.info(result)
}
