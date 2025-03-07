const { fromEntries, keys } = Object

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const setValue = (target) => (key) => [
  `set${capitalizeFirstLetter(key)}`,
  (value) => {
    target[key] = value
  },
]

export default (obj, func) => fromEntries(keys(obj).map(func))
