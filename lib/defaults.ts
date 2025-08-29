export type AutoConsoleGroupDefaultOptions = {
  expand?: boolean
  defaultEvent?: string | undefined
  event?: string | undefined
  label?: string
  showTime?: boolean
}

export const defaultConfig: AutoConsoleGroupDefaultOptions = {
  expand: false,
  defaultEvent: undefined,
  event: undefined,
  label: 'AutoConsoleGroup',
  showTime: true,
}

export const nonDeferrable = {
  profile: 0,
  profileEnd: 0,
  timeStamp: 0,
  trace: 0,
}
