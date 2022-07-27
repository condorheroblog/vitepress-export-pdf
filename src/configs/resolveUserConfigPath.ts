import path from 'node:path'
import fs from 'fs-extra'
import pcolors from 'picocolors'

import { logger } from '../utils'

/**
 * Resolve file path of user config
 */
export const resolveUserConfigPath = (
  userConfigPath: string,
  cwd = process.cwd(),
): string => {
  const configPath = path.resolve(cwd, userConfigPath)

  if (!fs.pathExistsSync(configPath)) {
    throw logger.error(
      `config file does not exist: ${pcolors.magenta(userConfigPath)}`,
    )
  }

  return configPath
}
