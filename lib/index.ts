import createConsoleGroup from 'auto-console-group'

const BOLD = 'font-weight: bold;'
const BLUE = 'color: #135CD2;'
const BLUE_LIGHT = 'color: #A9C7FB;'

const isDarkModeEnabled = (): boolean => window?.matchMedia('(prefers-color-scheme: dark)').matches

const HIGHLIGHT = isDarkModeEnabled() ? BLUE_LIGHT : BLUE

const consoleGroup = createConsoleGroup({
  label: 'auto-group-console',
  defaultEvent: 'RENAMED',
  showTime: false,
  collapsed: false,
})

consoleGroup.warn('%cThis package has been renamed to %cauto-console-group%c', BOLD, HIGHLIGHT)
consoleGroup.log('Please update your imports to use the new package name')
consoleGroup.info('%chttps://www.npmjs.com/package/auto-console-group', HIGHLIGHT)

export default createConsoleGroup
