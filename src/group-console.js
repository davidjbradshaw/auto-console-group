import { NORMAL } from './consts'
import { time } from './utils'

export default function (initialConfig) {
  let active = false

  const config = {
    enabled: true,
    title: '',
    ...initialConfig,
  }

  function groupEnd() {
    console?.groupEnd()
    active = false
  }

  function group() {
    active = true
    console?.group(`${config.id} %c${time()}`, NORMAL)
    queueMicrotask(groupEnd)
  }

  const wrapConsole = (type) => (...msg) => {
    if (!config.enabled) return true
    if (!active) group()
    return console[type](...msg)
  }

  return {
    config,
    ...Object.keys(console).map(wrapConsole),
  }
}
