import createAutoGroupConsole from './lib/index'

const COLLAPSED = 'collapsed log'

const autoGroupConsole = createAutoGroupConsole({
  label: 'Auto Group',
  defaultEvent: 'Event',
})

const collapsedConsole = createAutoGroupConsole({
  label: 'Auto Collapsed Group',
  collapsed: true,
})

const timelessConsole = createAutoGroupConsole({
  label: 'Group without event and time',
  showTime: false,
})

autoGroupConsole.time('myTimer')

setTimeout(() => {
  autoGroupConsole.log('This will be logged at the end of the current Event Loop')
  autoGroupConsole.timeLog('myTimer', 'This will be logged with the console.timeLog')
}, 37)

setTimeout(() => {
  autoGroupConsole.count('count')
  autoGroupConsole.event('myEvent')
  autoGroupConsole.label('myLabel')
  autoGroupConsole.count('count')
  autoGroupConsole.timeLog('myTimer')
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
  autoGroupConsole.count('count')
  autoGroupConsole.event('myEvent')
  autoGroupConsole.label('myLabel')
  autoGroupConsole.count('count')
  autoGroupConsole.timeEnd('myTimer')
}, 1486)