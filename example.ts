import createConsoleGroup from './lib/index'

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
}, 37)

setTimeout(() => {
  console.count(COUNT)
  console.event('myEvent')
  console.label('myLabel')
  console.count(COUNT)
  console.timeLog('myTimer')
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
  timelessConsole.purge() // removes above logs from the group
  timelessConsole.count(COUNT)
}, 1235)

setTimeout(() => {
  console.event('myEvent')
  console.label('myLabel')
  // no group created, as we have not logged anything
}, 1486)

setTimeout(
  console.errorBoundary(() => {
    console.event('TypeError')
    console.label('errorBoundary')
    console.showTime(false)
    console.expand(false)
    console.info('This group is contained within an errorBoundary')
    console.info('Errors are caught and logged to the consoleGroup')
    throw new TypeError('Error in errorBoundary')
  }),
  1600,
)

setTimeout(() => {
  console.label('myLabel') // reset as we changed it above
  console.expand(true) // reset as we changed it above
  console.showTime(true) // reset as we changed it above
  console.count(COUNT)
  console.event('endTimes') // this resets after each group
  console.label('myLabel')
  console.timeEnd('myTimer')
}, 1700)
