/**
* press-export-pdf cli
*/

import { afterParse, beforeParse, runCli } from '../runner'

runCli(
  'press-export-pdf',
  beforeParse,
  afterParse,
)
