// eslint-disable-next-line import/extensions
import createAutoConsoleGroup from './dist/index.js'

const COLLAPSED = 'collapsed log'
const COUNT = 'console.count'

const autoConsoleGroup = createAutoConsoleGroup({
  label: 'Auto Group',
  defaultEvent: 'Event',
})

const collapsedConsole = createAutoConsoleGroup({
  label: 'Auto Collapsed Group',
  collapsed: true,
})

const timelessConsole = createAutoConsoleGroup({
  label: 'Group without event and time',
  showTime: false,
})

autoConsoleGroup.time('myTimer')

setTimeout(() => {
  autoConsoleGroup.log('Groups are logged at the end of the current Event Loop iteration')
  autoConsoleGroup.timeLog('myTimer', 'Logged with console.timeLog()')
}, 37)

setTimeout(() => {
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.event('myEvent')
  autoConsoleGroup.label('myLabel')
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.timeLog('myTimer')
}, 486)

setTimeout(() => {
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.event('myEvent')
  collapsedConsole.countReset(COLLAPSED)
}, 1234)

setTimeout(() => {
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.warn('A warning will force a collapsed group to expand')
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.event('myEvent')
}, 1235)

setTimeout(() => {
  timelessConsole.count(COUNT)
  timelessConsole.count(COUNT)
  timelessConsole.count(COUNT)
}, 1235)

setTimeout(() => {
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.event('myEvent')
  autoConsoleGroup.label('myLabel')
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.timeEnd('myTimer')
}, 1486)
