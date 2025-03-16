import { BOLD, ITALIC, NORMAL } from './consts'
import { defaultConfig } from './defaults'
import event from './event'
import time from './time'
import wrap, { setValue } from './wrap-object'

export default function (options) {
  let consoleQueue = []
  let startTime

  const config = {
    ...defaultConfig,
    defaultEvent: options?.defaultEvent || defaultConfig.defaultEvent,
    label: options?.label || 'Defer Group',
  }

  function resetQueue() {
    consoleQueue = []
    return true
  }

  function reset() {
    config.event = undefined
    return resetQueue()
  }

  function autoConsoleGroup() {
    if (consoleQueue.length === 0) return
    console?.group(
      `%c${config.label} %c${event(config)}%c${config.showTime ? startTime : ''}`,
      NORMAL,
      BOLD,
      ITALIC + NORMAL,
    )
    for (const [key, ...msg] of consoleQueue) console[key](...msg)
    console?.groupEnd()

    reset()
  }

  const reflectConsole = (key) => [
    key,
    function (...msg) {
      if (consoleQueue.length === 0) {
        startTime = time()

        // double microtask to ensure the output is called last
        queueMicrotask(() => queueMicrotask(autoConsoleGroup))
      }

      consoleQueue.push([key, ...msg])

      return true
    },
  ]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    purge: resetQueue,
    endAutoGroup: autoConsoleGroup,
  }
}
