import { ROUNDING } from './consts'

export const round = (value) => Math.round(value * ROUNDING) / ROUNDING

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const time = () => {
  const t = new Date()
  return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}.${t.getMilliseconds()}`
}

export const wrap = (obj, func) => Object.fromEntries(Object.keys(obj).map(func))
