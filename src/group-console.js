import { NORMAL } from './consts'
import { defaultConfig } from './defaults'
import { setValue, time, wrap } from './utils'

export default function ({ enabled = true, title = 'Auto Group' }) {
  let active = false

  const config = {
    ...defaultConfig,
    enabled,
    title,
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
    if (!config.enabled && !config.loopEnabled) return true
    if (!active) createGroup()

    return console[key](...msg)
  }]

  return {
    ...wrap(config, setValue(config)),
    ...wrap(console, reflectConsole),
  }
}
