import {
  BOLD, DEFAULT, ERROR, LOG, NORMAL, NORMAL_ITALIC,
} from './consts'
import {
  AutoConsoleGroupDefaultOptions,
  defaultConfig,
  nonDeferrable,
} from './defaults'
import getEvent from './event'
import getStartTime from './time'
import wrap, { createNonDeferrable, Entry, setValue } from './wrap-object'

type AutoConsoleGroup = Console & {
  collapsed: (value: boolean) => void
  endAutoGroup: () => void
  errorBoundary: (func: Function) => Function
  event: (value: string) => void
  label: (value: string) => void
  purge: () => void
  showTime: (value: boolean) => void
}

type AutoConsoleGroupOptions = Omit<AutoConsoleGroupDefaultOptions, 'event'>

type Counter = Record<string, number>

export default function (options: AutoConsoleGroupOptions = {}): AutoConsoleGroup {
  const timers: Counter = {}
  const counters: Counter = {}
  const consoleQueue: [string, ...any[]][] = []
  const config: AutoConsoleGroupDefaultOptions = {
    ...defaultConfig,
    ...options,
  }

  let startTime: string

  function resetConsoleQueue(): void {
    consoleQueue.length = 0
  }

  function resetConsoleGroup(): void {
    delete config.event
    resetConsoleQueue()
  }

  const hasErrorWarning = ():boolean => consoleQueue.some(([key]) => key === 'error' || key === 'warn')

  const isCollapsed = ():boolean => (hasErrorWarning() ? false : !!config.collapsed)
  const groupStartTime = ():string => (config.showTime ? startTime : '')

  function autoConsoleGroup(): void {
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

    for (const [key, ...args] of consoleQueue) {
      (console[key as keyof Console] as (...args: any[]) => void)(...args)
    }

    console.groupEnd()
    resetConsoleGroup()
  }

  function startGroup(): void {
    startTime = getStartTime()
    // double microtask to ensure the output is called last
    queueMicrotask(() => queueMicrotask(autoConsoleGroup))
  }

  function pushToConsoleQueue(key: string, ...args: any[]): void {
    if (consoleQueue.length === 0) startGroup()
    consoleQueue.push([key, ...args])
  }

  const errorBoundary = (func: Function):Function =>
    (...args: any[]) => {
      let retValue

      try {
        retValue = func(...args)
      } catch (error: any) {
        if (Error.prototype.isPrototypeOf(error)) pushToConsoleQueue(ERROR, error)
        else throw error
      }

      return retValue
    }

  function count(label = DEFAULT): void {
    if (counters[label]) {
      counters[label] += 1
    } else {
      counters[label] = 1
    }
    pushToConsoleQueue(LOG, `${label}: ${counters[label]}`)
  }

  function countReset(label = DEFAULT): void {
    delete counters[label]
  }

  function time(label = DEFAULT): void {
    timers[label] = performance.now()
  }

  function timeLog(label = DEFAULT, ...args: any[]): void {
    const now = performance.now() - timers[label]
    pushToConsoleQueue(LOG, `${label}: ${now} ms`, ...args)
  }

  function timeEnd(label = DEFAULT): void {
    timeLog(label)
    delete timers[label]
  }

  const reflectConsole = (key: string): Entry => [
    key,
    (...args: any[]) => pushToConsoleQueue(key, ...args),
  ]

  // @ts-expect-error: TS has a meltdown returning a dynamic object at runtime with known keys
  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    ...wrap(nonDeferrable, createNonDeferrable),
    count,
    countReset,
    endAutoGroup: autoConsoleGroup,
    errorBoundary,
    purge: resetConsoleQueue,
    time,
    timeEnd,
    timeLog,
  }
}
