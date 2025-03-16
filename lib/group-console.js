import { BOLD, ITALIC, NORMAL } from './consts'
import { defaultConfig } from './defaults'
import event from './event'
import time from './time'
import wrap, { setValue } from './wrap-object'

export default function (options) {
  let active = false

  const config = {
    ...defaultConfig,
    defaultEvent: options?.defaultEvent || defaultConfig.defaultEvent,
    title: options?.title || 'Auto Group',
  }

  function groupEnd() {
    active = false
    config.event = undefined
    console?.groupEnd()
  }

  function createGroup() {
    active = true
    console?.group(
      `%c${config.title} %c${event(config)}%c${time()}`,
      NORMAL,
      BOLD,
      ITALIC + NORMAL,
    )
    queueMicrotask(groupEnd)
  }

  const reflectConsole = (key) => [key, (...msg) => {
    if (!active) createGroup()
    return console[key](...msg)
  }]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    purge: () => true,
    endAutoGroup: groupEnd,
  }
}
