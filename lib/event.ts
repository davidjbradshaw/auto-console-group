type Config = {
  event?: string
  defaultEvent?: string
} & Record<string, any>

export default (config: Config) => {
  const event = config.event || config.defaultEvent
  return event ? `${event} ` : ''
}
