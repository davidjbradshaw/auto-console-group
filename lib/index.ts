import createConsoleGroup, { BOLD, HIGHLIGHT } from 'auto-console-group'

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
