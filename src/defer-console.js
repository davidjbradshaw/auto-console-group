import { NORMAL } from './consts'
import { defaultConfig } from './defaults'
import time from './time'
import wrap, { setValue } from './wrap-object'

export default function ({ enabled = true, title = 'Defer Group' }) {
  let consoleQueue = []
  let startTime

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

    console?.group(`${config.loopTitle || config.title} %c${startTime}`, NORMAL)
    for (const [key, ...msg] of consoleQueue) console[key](...msg)
    console?.groupEnd()

    reset()
  }

  const reflectConsole = (key) => [
    key,
    function (...msg) {
      if (consoleQueue.length === 0) {
        startTime = time()
        queueMicrotask(autoConsoleGroup)
      }

      consoleQueue.push([key, ...msg])

      return true
    },
  ]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
  }
}
