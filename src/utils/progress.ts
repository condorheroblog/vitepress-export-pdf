import { Presets, SingleBar } from 'cli-progress'
import pcolors from 'picocolors'

const { blue, cyan, green, yellow } = pcolors

export function createSingleProgress(format = '{spin}' + '{bar}' + '| {percentage} % || {value} / {total}') {
  function getSpinner(n = 0) {
    return [cyan('●'), green('◆'), blue('■'), yellow('▲')][n % 4]
  }
  let spinner = 0
  // @see https://www.designcise.com/web/tutorial/what-is-the-correct-typescript-return-type-for-javascripts-setinterval-function
  let timer: ReturnType < typeof setInterval >

  const progress = new SingleBar({
    clearOnComplete: true,
    hideCursor: true,
    format,
    linewrap: false,
    barsize: 30,
  }, Presets.shades_grey)

  return {
    bar: progress,
    start(total: number, startValue = 0) {
      progress.start(total, startValue, { spin: getSpinner(spinner) })
      timer = setInterval(() => {
        spinner += 1
        progress.update({ spin: getSpinner(spinner) })
      }, 200)
    },
    update(v: number) {
      progress.update(v, { spin: getSpinner(spinner) })
    },
    stop() {
      clearInterval(timer)
      progress.stop()
      spinner = 0
    },
  }
}
