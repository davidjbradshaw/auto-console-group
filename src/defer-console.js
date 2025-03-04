import { NORMAL } from './consts'
import { time } from './utils'

export default function (initialConfig) {
  let logQueue = []

  const config = {
    enabled: true,
    title: '',
    ...initialConfig,
  }

  function logGroup() {
    console?.group(`${config.id} %c${time()}`, NORMAL)
    logQueue.forEach(([type, ...msg]) => console[type](...msg))
    logQueue = []
    console?.groupEnd()
  }

  const wrapConsole = (type) => (...msg) => {
    if (!config.enabled) return
    if (logQueue.length === 0) queueMicrotask(logGroup)
    logQueue.push([type, ...msg])
  }

  return {
    config,
    ...Object.keys(console).map(wrapConsole),
  }
}
