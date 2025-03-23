export default function time():string {
  const now = new Date()
  const padTime = (key: 'getHours' | 'getMinutes' | 'getSeconds' | 'getMilliseconds', targetLength: number): string =>
    now[key]().toString().padStart(targetLength, '0')

  const hours = padTime('getHours', 2)
  const minutes = padTime('getMinutes', 2)
  const seconds = padTime('getSeconds', 2)
  const milliseconds = padTime('getMilliseconds', 3)

  return `@ ${hours}:${minutes}:${seconds}.${milliseconds}`
}
