import { BOLD, ITALIC, NORMAL } from './consts'
import { defaultConfig } from './defaults'
import event from './event'
import time from './time'
import wrap, { setValue } from './wrap-object'

export default function (options) {
  let active = false

  const config = {
    ...defaultConfig,
    ...options,
  }

  function groupEnd() {
    active = false
    config.event = undefined
    console.groupEnd()
  }

  function createGroup() {
    active = true

    console[config.collapsed ? 'groupCollapsed' : 'group'](
      `%c${config.label} %c${event(config)}%c${config.showTime ? time() : ''}`,
      NORMAL,
      BOLD,
      ITALIC + NORMAL,
    )

    // double microtask to ensure the output is called last
    queueMicrotask(() => queueMicrotask(groupEnd))
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
