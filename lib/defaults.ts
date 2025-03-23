export type AutoConsoleGroupDefaultOptions = {
  collapsed?: boolean
  defaultEvent?: string | undefined
  event?: string | undefined
  label?: string
  showTime?: boolean
}

export const defaultConfig: AutoConsoleGroupDefaultOptions = {
  collapsed: false,
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
