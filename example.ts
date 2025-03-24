import createAutoConsoleGroup from './lib/index'

const COLLAPSED = 'collapsed log'

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
  autoConsoleGroup.log('This will be logged at the end of the current Event Loop')
  autoConsoleGroup.timeLog('myTimer', 'This will be logged with the console.timeLog')
}, 37)

setTimeout(() => {
  autoConsoleGroup.count('count')
  autoConsoleGroup.event('myEvent')
  autoConsoleGroup.label('myLabel')
  autoConsoleGroup.count('count')
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
  collapsedConsole.warn('This will force a collapsed group to expand')
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.event('myEvent')
}, 1235)

setTimeout(() => {
  timelessConsole.count('count')
  timelessConsole.count('count')
  timelessConsole.count('count')
}, 1235)

setTimeout(() => {
  autoConsoleGroup.count('count')
  autoConsoleGroup.event('myEvent')
  autoConsoleGroup.label('myLabel')
  autoConsoleGroup.count('count')
  autoConsoleGroup.timeEnd('myTimer')
}, 1486)
