export default (config) => {
  const event = config.event || config.defaultEvent
  return event ? `${event} ` : ''
}
