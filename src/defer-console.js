import { NORMAL } from './consts'
import { capitalizeFirstLetter, time, wrap } from './utils'

export default function ({ enabled = true, title = 'Defer Group' }) {
  let logQueue = []

  const config = {
    enabled,
    title,
    loopEnabled: false,
    loopTitle: undefined,
  }

  const wrapConfig = (key) => [
    `set${capitalizeFirstLetter(key)}`,
    (value) => {
      config[key] = value
    },
  ]

  function reset() {
    config.loopTitle = undefined
    config.loopEnabled = !!config.loopEnabled
    logQueue = []
  }

  function logGroup() {
    console?.group(`${config.loopTitle || config.title} %c${time()}`, NORMAL)
    logQueue.forEach(([key, ...msg]) => console[key](...msg))
    console?.groupEnd()
    reset()
  }

  const wrapConsole = (key) => [key, (...msg) => {
    if (!config.enabled && !config.loopEnabled) return true
    if (logQueue.length === 0) queueMicrotask(logGroup)
    logQueue.push([key, ...msg])
    return true
  }]

  return {
    ...wrap(config, wrapConfig),
    ...wrap(console, wrapConsole),
  }
}
