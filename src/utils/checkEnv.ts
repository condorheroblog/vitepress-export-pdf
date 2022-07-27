/**
 * Module dependencies.
 */

import semver from 'semver'
import { logger } from '.'

/**
 * Check if Node version meets VitePress requirement.
 */

export function checkEnv(nodeVersion: string) {
  if (!semver.satisfies(process.version, nodeVersion, { includePrerelease: true })) {
    logger.error(
      '\n[VitePress] minimum Node version not met:'
      + `\nYou are using Node ${process.version}, but VitePress `
      + `requires Node ${nodeVersion}.\nPlease upgrade your Node version.\n`,
    )
    process.exit(1)
  }
}
