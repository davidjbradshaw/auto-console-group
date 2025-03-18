import { BOLD, ITALIC, NORMAL } from './consts'
import { defaultConfig, nonDeferrable } from './defaults'
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

    // double microtask to ensure the output is called last
    queueMicrotask(() => queueMicrotask(autoConsoleGroup))
  }

  function pushToQueue(key, ...msg) {
    if (consoleQueue.length === 0) startGroup()
    consoleQueue.push([key, ...msg])
    return true
  }

  const reflectConsole = (key) => [
    key,
    (...msg) => pushToQueue(key, ...msg),
  ]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    ...wrap(nonDeferrable, (key) => [key, console[key]]),
    purge: resetQueue,
    endAutoGroup: autoConsoleGroup,
  }
}
