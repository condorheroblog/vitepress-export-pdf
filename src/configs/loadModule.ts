import { bundleRequire } from 'bundle-require'
import type { UserConfig } from './userConfigTypes'

/**
 * loadModule is a function that loads the user config.
 * @param configPath path to user config file
 * @returns config - UserConfig
 */
export const loadModule = async (configPath: string): Promise<UserConfig> => {
  const { mod } = await bundleRequire({
    filepath: configPath,
  })

  return mod.default || mod
}
