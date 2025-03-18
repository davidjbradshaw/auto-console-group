import { BOLD, ITALIC, NORMAL } from './consts'
import { defaultConfig, nonDeferrable } from './defaults'
import event from './event'
import start from './time'
import wrap, { setValue } from './wrap-object'

export default function (options) {
  let consoleQueue = []
  let startTime

  const timers = {}

  const config = {
    ...defaultConfig,
    ...options,
  }

  function resetQueue() {
    consoleQueue = []
  }

  function reset() {
    delete config.event
    resetQueue()
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
      ITALIC + NORMAL,
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

  function pushToQueue(key, ...args) {
    if (consoleQueue.length === 0) startGroup()
    consoleQueue.push([key, ...args])
  }

  function time(label = 'default') {
    timers[label] = performance.now()
  }

  function timeLog(label = 'default', ...args) {
    const now = performance.now() - timers[label]
    pushToQueue('log', `${label}: ${now} ms`, ...args)
  }

  function timeEnd(label = 'default') {
    timeLog(label)
    delete timers[label]
  }

  const reflectConsole = (key) => [
    key,
    (...args) => pushToQueue(key, ...args),
  ]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    ...wrap(nonDeferrable, (key) => [key, console[key]]),
    endAutoGroup: autoConsoleGroup,
    purge: resetQueue,
    time,
    timeEnd,
    timeLog,
  }
}
