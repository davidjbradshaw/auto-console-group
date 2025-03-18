import { BOLD, NORMAL, NORMAL_ITALIC } from './consts'
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

  function closeGroup() {
    // double microtask to ensure the output is called last
    queueMicrotask(() => queueMicrotask(groupEnd))

    // close the group even if JS crashes on the current event loop
    setTimeout(groupEnd)
  }

  function createGroup() {
    active = true

    console[config.collapsed ? 'groupCollapsed' : 'group'](
      `%c${config.label} %c${event(config)}%c${config.showTime ? time() : ''}`,
      NORMAL,
      BOLD,
      NORMAL_ITALIC,
    )

    closeGroup()
  }

  const reflectConsole = (key) => [key, (...msg) => {
    if (!active) createGroup()
    return console[key](...msg)
  }]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
    purge: () => true, // not supported in real time console
    endAutoGroup: groupEnd,
  }
}
