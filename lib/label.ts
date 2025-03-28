type Config = {
  label?: string
  defaultLabel?: string
} & Record<string, any>

export default (config: Config):string => {
  const label = config.label || config.defaultLabel
  return label ? `${label}` : ''
}
