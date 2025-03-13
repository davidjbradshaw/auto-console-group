import { NORMAL } from './consts'
import { defaultConfig } from './defaults'
import time from './time'
import wrap, { setValue } from './wrap-object'

export default function (options) {
  let active = false

  const config = {
    ...defaultConfig,
    title: options?.title || 'Auto Group',
  }

  function groupEnd() {
    active = false
    config.loopTitle = undefined
    config.loopEnabled = config.enabled
    console?.groupEnd()
  }

  function createGroup() {
    active = true
    console?.group(`${config.loopTitle || config.title} %c${time()}`, NORMAL)
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
  }
}
