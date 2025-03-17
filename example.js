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

setTimeout(() => {
  autoGroupConsole.log('This will be logged at the end of the current Event Loop')
}, 37)

setTimeout(() => {
  autoGroupConsole.count('log')
  autoGroupConsole.event('myEvent')
  autoGroupConsole.label('myLabel')
  autoGroupConsole.count('log')
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
  timelessConsole.count('log')
  timelessConsole.count('log')
  timelessConsole.count('log')
  ds
}, 1235)
