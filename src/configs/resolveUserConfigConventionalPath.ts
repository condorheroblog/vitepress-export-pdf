import path from 'node:path'
import fs from 'fs-extra'

/**
 * Resolve conventional user config file path
 */
export const resolveUserConfigConventionalPath = (
  source: string,
  cwd = process.cwd(),
) =>
  [
    path.resolve(cwd, 'vitepress-pdf.config.ts'),
    path.resolve(cwd, 'vitepress-pdf.config.js'),
    path.resolve(cwd, 'vitepress-pdf.config.cjs'),
    path.resolve(cwd, 'vitepress-pdf.config.mjs'),
    path.resolve(source, '.vitepress/vitepress-pdf.config.ts'),
    path.resolve(source, '.vitepress/vitepress-pdf.config.js'),
    path.resolve(source, '.vitepress/vitepress-pdf.config.cjs'),
    path.resolve(source, '.vitepress/vitepress-pdf.config.mjs'),
  ].find(item => fs.pathExistsSync(item))
