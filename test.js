// eslint-disable-next-line import/extensions
import createConsoleGroup from './dist/index.js'

const COLLAPSED = 'collapsed log'
const COUNT = 'console.count'

const console = createConsoleGroup({
  label: 'Auto Group',
  defaultEvent: 'Event',
})

const collapsedConsole = createConsoleGroup({
  label: 'Auto Collapsed Group',
  expand: false,
})

const timelessConsole = createConsoleGroup({
  label: 'Group without event and time',
  showTime: false,
})

console.time('myTimer')

setTimeout(() => {
  console.log('Groups are logged at the end of the current Event Loop iteration')
  console.timeLog('myTimer', 'Logged with console.timeLog()')
}, 1)

setTimeout(() => {
  console.count(COUNT)
  console.event('myEvent')
  console.label('myLabel')
  console.count(COUNT)
  console.timeLog('myTimer')
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
  console.assert(false, 'console.assert()')
  console.count(COUNT)
  console.event('endTimes')
  console.label('myLabel')
  console.timeEnd('myTimer')
  console.timeLog('myTimer', 'Logged with console.timeLog()')
}, 7)
