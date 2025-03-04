import { ROUNDING } from './consts'

export const round = (value) => Math.round(value * ROUNDING) / ROUNDING

export const time = () => {
  const t = new Date()
  return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}.${t.getMilliseconds()}`
}
