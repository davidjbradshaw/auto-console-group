import {
  BOLD, DEFAULT, NORMAL, NORMAL_ITALIC,
} from './consts'
import { defaultConfig, nonDeferrable } from './defaults'
import event from './event'
import start from './time'
import wrap, { setValue } from './wrap-object'

export default function (options) {
  const consoleQueue = []
  const timers = {}
  const config = {
    ...defaultConfig,
    ...options,
  }

  let startTime

  function resetConsoleQueue() {
    consoleQueue.length = 0
  }

  function reset() {
    delete config.event
    resetConsoleQueue()
  }

  const hasErrorWarning = () => consoleQueue.some(([key]) => key === 'error' || key === 'warn')

  function autoConsoleGroup() {
    if (consoleQueue.length === 0) return

    const displayTime = (config.showTime ? startTime : '')

    let { collapsed } = config
    if (collapsed && hasErrorWarning()) collapsed = false

    console[collapsed ? 'groupCollapsed' : 'group'](
      `%c${config.label} %c${event(config)}%c${displayTime}`,
      NORMAL,
      BOLD,
      NORMAL_ITALIC,
    )

    for (const [key, ...args] of consoleQueue) console[key](...args)

    console.groupEnd()
    reset()
  }

  function startGroup() {
    startTime = start()

    // double microtask to ensure the output is called last
    queueMicrotask(() => queueMicrotask(autoConsoleGroup))
  }

  function pushToConsoleQueue(key, ...args) {
    if (consoleQueue.length === 0) startGroup()
    consoleQueue.push([key, ...args])
  }

  function time(label = DEFAULT) {
    timers[label] = performance.now()
  }

  function timeLog(label = DEFAULT, ...args) {
    const now = performance.now() - timers[label]
    pushToConsoleQueue('log', `${label}: ${now} ms`, ...args)
  }

  function timeEnd(label = DEFAULT) {
    timeLog(label)
    delete timers[label]
  }

  const reflectConsole = (key) => [
    key,
    (...args) => pushToConsoleQueue(key, ...args),
  ]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    ...wrap(nonDeferrable, (key) => [key, console[key]]),
    endAutoGroup: autoConsoleGroup,
    purge: resetConsoleQueue,
    time,
    timeEnd,
    timeLog,
  }
}
