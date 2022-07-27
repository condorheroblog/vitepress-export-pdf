import type { CAC } from 'cac'
import cac from 'cac'

import pkg from '../package.json'
import { registerCommands } from './registerCommands'

type InterfaceParse = (cliInstance: CAC) => void

export const beforeParse = (cliInstance: CAC) => {
  registerCommands(cliInstance)

  // display cli version, display help message
  cliInstance.version(pkg.version).help()
}

export const afterParse = (cliInstance: CAC) => {
  if (!process.argv.slice(2).filter(Boolean).length)
    cliInstance.outputHelp()
}

/**
 * Parse CLI.
 * @param programName - Name of program
 * @param beforeParse - Function to run before parse
 * @param afterParse - Function to run after parse
 */
export const runCli = (programName: string, beforeParse: InterfaceParse, afterParse: InterfaceParse) => {
  try {
    // create cac instance
    const program = cac(programName)
    beforeParse && beforeParse(program)
    program.parse(process.argv)
    afterParse && afterParse(program)
  }
  catch (error) {
    process.exit(1)
  }
}
