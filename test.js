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
}, 1)

setTimeout(() => {
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.event('myEvent')
  autoConsoleGroup.label('myLabel')
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.timeLog('myTimer')
}, 2)

setTimeout(() => {
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.event('myEvent')
  collapsedConsole.countReset(COLLAPSED)
}, 3)

setTimeout(() => {
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.warn('A warning will force a collapsed group to expand')
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.event('myEvent')
}, 4)

setTimeout(() => {
  timelessConsole.count(COUNT)
  timelessConsole.count(COUNT)
  timelessConsole.event('purge')
  timelessConsole.purge() // removes above logs from the group
  timelessConsole.count(COUNT)
}, 5)

setTimeout(collapsedConsole.errorBoundary(() => {
  collapsedConsole.count(COUNT)
  collapsedConsole.event('TYPE_ERROR')
  collapsedConsole.label('errorBoundary')
  collapsedConsole.showTime(false)
  collapsedConsole.count(COUNT)
  throw new TypeError('Error in errorBoundary')
}), 6)

setTimeout(() => {
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.event('endTimes')
  autoConsoleGroup.label('myLabel')
  autoConsoleGroup.timeEnd('myTimer')
}, 7)
