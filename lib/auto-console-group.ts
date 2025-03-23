import {
  BOLD, DEFAULT, NORMAL, NORMAL_ITALIC,
} from './consts'
import { defaultConfig, nonDeferrable } from './defaults'
import getEvent from './event'
import getStartTime from './time'
import wrap, { setValue } from './wrap-object'

type AutoConsoleGroup = Console & {
  event: string
  label: string
  collapsed: boolean
  showTime: boolean
  endAutoGroup: () => void
  purge: () => void
  time: (label?: string) => void
  timeEnd: (label?: string) => void
  timeLog: (label?: string, ...args: any[]) => void
}

type AutoConsoleGroupOptions = {
  defaultEvent?: string
  event?: string
  label?: string
  collapsed?: boolean
  showTime?: boolean
}

type Timers = {
  [index: string]: number
}

export default function (options: AutoConsoleGroupOptions = {}): AutoConsoleGroup {
  const timers: Timers = {}
  const consoleQueue: [string, ...any[]][] = []
  const config: AutoConsoleGroupOptions = {
    ...defaultConfig,
    ...options,
  }

  let startTime: string

  function resetConsoleQueue() {
    consoleQueue.length = 0
  }

  function resetConsoleGroup() {
    delete config.event
    resetConsoleQueue()
  }

  const hasErrorWarning = () =>
    consoleQueue.some(([key]) => key === 'error' || key === 'warn')
  const isCollapsed = () => (hasErrorWarning() ? false : config.collapsed)
  const groupStartTime = () => (config.showTime ? startTime : '')

  function autoConsoleGroup() {
    if (consoleQueue.length === 0) {
      resetConsoleGroup()
      return
    }

    console[isCollapsed() ? 'groupCollapsed' : 'group'](
      `%c${config.label}%c ${getEvent(config)} %c${groupStartTime()}`,
      NORMAL,
      BOLD,
      NORMAL_ITALIC,
    )

    for (const [key, ...args] of consoleQueue)
      (console[key as keyof Console] as (...args: any[]) => void)(...args)

    console.groupEnd()
    resetConsoleGroup()
  }

  function startGroup() {
    startTime = getStartTime()
    // double microtask to ensure the output is called last
    queueMicrotask(() => queueMicrotask(autoConsoleGroup))
  }

  function pushToConsoleQueue(key: string, ...args: any[]) {
    if (consoleQueue.length === 0) startGroup()
    consoleQueue.push([key, ...args])
  }

  function time(label = DEFAULT) {
    timers[label] = performance.now()
  }

  function timeLog(label = DEFAULT, ...args: any[]) {
    const now = performance.now() - timers[label]
    pushToConsoleQueue('log', `${label}: ${now} ms`, ...args)
  }

  function timeEnd(label = DEFAULT) {
    timeLog(label)
    delete timers[label]
  }

  const reflectConsole = (key: string): [string, (...args: any[]) => void] => [
    key,
    (...args: any[]) => pushToConsoleQueue(key, ...args),
  ]

  // @ts-ignore
  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    ...wrap(nonDeferrable, (key: string) => [
      key,
      console[key as keyof Console] as (...args: any[]) => void,
    ]),
    endAutoGroup: autoConsoleGroup,
    purge: resetConsoleQueue,
    time,
    timeEnd,
    timeLog,
  }
}
