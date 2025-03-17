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
    ...options,
  }

  function resetQueue() {
    consoleQueue = []
    return true
  }

  function reset() {
    config.event = undefined
    return resetQueue()
  }

  const hasErrorWarning = () => consoleQueue.some(([key]) => key === 'error' || key === 'warn')

  function autoConsoleGroup() {
    if (consoleQueue.length === 0) return

    let { collapsed } = config
    if (collapsed && hasErrorWarning()) collapsed = false

    console[collapsed ? 'groupCollapsed' : 'group'](
      `%c${config.label} %c${event(config)}%c${config.showTime ? startTime : ''}`,
      NORMAL,
      BOLD,
      ITALIC + NORMAL,
    )

    for (const [key, ...msg] of consoleQueue) console[key](...msg)

    console.groupEnd()
    reset()
  }

  function startGroup() {
    startTime = time()
    queueMicrotask(() => queueMicrotask(autoConsoleGroup))
    setTimeout(autoConsoleGroup)
  }

  const reflectConsole = (key) => [
    key,
    function (...msg) {
      if (consoleQueue.length === 0) startGroup()

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
