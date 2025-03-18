const { fromEntries, keys } = Object

export const setValue = (target) => (key) => [
  key,
  function (value) {
    target[key] = value
  },
]

export default (obj, func) => fromEntries(keys(obj).map(func))
