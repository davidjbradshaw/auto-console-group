const { fromEntries, keys } = Object

export function time() {
  const t = new Date()
  const padTime = (key, l) => t[`get${key}`]().toString().padStart(l, '0')

  const hours = padTime('Hours', 2)
  const minutes = padTime('Minutes', 2)
  const seconds = padTime('Seconds', 2)
  const milliseconds = padTime('Milliseconds', 3)

  return `@ ${hours}:${minutes}:${seconds}.${milliseconds}`
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const setValue = (target) => (key) => [
  `set${capitalizeFirstLetter(key)}`,
  (value) => {
    target[key] = value
  },
]

export const wrap = (obj, func) => fromEntries(keys(obj).map(func))
