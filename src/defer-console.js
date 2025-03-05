import { NORMAL } from './consts'
import { defaultConfig } from './defaults'
import { setValue, time, wrap } from './utils'

export default function ({ enabled = true, title = 'Defer Group' }) {
  let consoleQueue = []

  const config = {
    ...defaultConfig,
    enabled,
    title,
  }

  function reset() {
    config.loopTitle = undefined
    config.loopEnabled = config.enabled
    consoleQueue = []
  }

  function autoConsoleGroup() {
    if (!config.enabled && !config.loopEnabled) return

    console?.group(`${config.loopTitle || config.title} %c${time()}`, NORMAL)
    for (const [key, ...msg] of consoleQueue) console[key](...msg)
    console?.groupEnd()

    reset()
  }

  const reflectConsole = (key) => [
    key,
    (...msg) => {
      if (consoleQueue.length === 0) queueMicrotask(autoConsoleGroup)

      consoleQueue.push([key, ...msg])

      return true
    },
  ]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
  }
}
