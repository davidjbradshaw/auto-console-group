const { fromEntries, keys } = Object

export const time = () => {
  const t = new Date()
  return `@ ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}.${t.getMilliseconds()}`
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const setValue = (target) => (key) => [
  `set${capitalizeFirstLetter(key)}`,
  (value) => {
    target[key] = value
  },
]

export const wrap = (obj, func) => fromEntries(keys(obj).map(func))
