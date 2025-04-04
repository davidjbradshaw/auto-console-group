import createAutoConsoleGroup from './lib/index'

const COLLAPSED = 'collapsed log'
const COUNT = 'console.count'

const autoConsoleGroup = createAutoConsoleGroup({
  label: 'Auto Group',
  defaultEvent: 'Event',
})

const collapsedConsole = createAutoConsoleGroup({
  label: 'Auto Collapsed Group',
  expand: false,
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
  timelessConsole.purge() // removes above logs from the group
  timelessConsole.count(COUNT)
}, 1235)

setTimeout(() => {
  autoConsoleGroup.event('myEvent')
  autoConsoleGroup.label('myLabel')
  // no group created, as we have not logged anything
}, 1486)

setTimeout(
  autoConsoleGroup.errorBoundary(() => {
    autoConsoleGroup.event('TypeError')
    autoConsoleGroup.label('errorBoundary')
    autoConsoleGroup.showTime(false)
    autoConsoleGroup.collapsed(true)
    autoConsoleGroup.info('This group is contained within an errorBoundary')
    autoConsoleGroup.info('Errors are caught and logged to the consoleGroup')
    throw new TypeError('Error in errorBoundary')
  }),
  1600,
)

setTimeout(() => {
  autoConsoleGroup.label('myLabel') // reset as we changed it above
  autoConsoleGroup.collapsed(false) // reset as we changed it above
  autoConsoleGroup.showTime(true) // reset as we changed it above
  autoConsoleGroup.count(COUNT)
  autoConsoleGroup.event('endTimes') // this resets after each group
  autoConsoleGroup.label('myLabel')
  autoConsoleGroup.timeEnd('myTimer')
}, 1700)
