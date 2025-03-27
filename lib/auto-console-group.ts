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
import wrap, { Entry, setValue } from './wrap-object'

type AutoConsoleGroup = Omit<Console, 'time' | 'timeEnd' | 'timeLog'> & {
  event: (value: string) => void
  errorBoundary: (func: Function) => Function
  label: (value: string) => void
  collapsed: (value: boolean) => void
  showTime: (value: boolean) => void
  endAutoGroup: () => void
  purge: () => void
  time: (label?: string) => void
  timeEnd: (label?: string) => void
  timeLog: (label?: string, ...args: unknown[]) => void
}

type AutoConsoleGroupOptions = Omit<AutoConsoleGroupDefaultOptions, 'event'>

type Timers = Record<string, number>

export default function (options: AutoConsoleGroupOptions = {}): AutoConsoleGroup {
  const timers: Timers = {}
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
      } catch (error) {
        pushToConsoleQueue(ERROR, error)
      }

      return retValue
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
    ...wrap(nonDeferrable, (key: string) => [
      key,
      console[key as keyof Console] as (...args: any[]) => void,
    ]),
    endAutoGroup: autoConsoleGroup,
    errorBoundary,
    purge: resetConsoleQueue,
    time,
    timeEnd,
    timeLog,
  }
}
