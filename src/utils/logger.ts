/* eslint-disable no-console */
import pcolors from 'picocolors'

export const log = (...args: any[]): void => {
  console.log(...args)
}

export const info = (...args: any[]): void => {
  console.log(pcolors.cyan('info'), ...args)
}

export const tip = (...args: any[]): void => {
  console.log(pcolors.blue('tip'), ...args)
}

export const success = (...args: any[]): void => {
  console.log(pcolors.green('success'), ...args)
}

export const warn = (...args: any[]): void => {
  console.warn(pcolors.yellow('warning'), ...args)
}

export const error = (...args: any[]): void => {
  console.error(pcolors.red('error'), ...args)
}

export const createError = (message?: string | undefined): Error => {
  error(message)
  return new Error(message)
}

export const logger = {
  log,
  info,
  tip,
  success,
  warn,
  error,
  createError,
}
