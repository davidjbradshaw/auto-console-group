export default function time():string {
  const now = new Date()
  const padTime = (key: 'Hours' | 'Minutes' | 'Seconds' | 'Milliseconds', targetLength: number): string =>
    now[`get${key}` as 'getHours' | 'getMinutes' | 'getSeconds' | 'getMilliseconds']().toString().padStart(targetLength, '0')

  const hours = padTime('Hours', 2)
  const minutes = padTime('Minutes', 2)
  const seconds = padTime('Seconds', 2)
  const milliseconds = padTime('Milliseconds', 3)

  return `@ ${hours}:${minutes}:${seconds}.${milliseconds}`
}
