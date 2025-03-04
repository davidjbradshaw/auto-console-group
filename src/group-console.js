import { NORMAL } from './consts'
import { time } from './utils'

export default function (initialConfig) {
  const logQueue = []

  const config = {
    enabled: true,
    title: '',
    ...initialConfig,
  }

  function logGroup() {
    console?.group(`${config.id} %c${time()}`, NORMAL)
    queueMicrotask(() => console?.groupEnd())
  }

  const wrapConsole = (type) => (...msg) => {
    if (!config.enabled) return
    if (logQueue.length === 0) logGroup()
    return console[type](...msg)
  }

  return {
    config,
    ...Object.keys(console).map(wrapConsole),
  }
}
