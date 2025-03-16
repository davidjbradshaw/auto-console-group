import createGroupConsole from './lib/index'

const COLLAPSED = 'collapsed log'

const deferConsole = createGroupConsole({ defaultEvent: 'Event' })
const timelessConsole = createGroupConsole({ showTime: false })
const collapsedConsole = createGroupConsole({ label: 'Auto Collapsed Group', collapsed: true })

setTimeout(() => {
  deferConsole.log('This will be logged at the end of the current Event Loop')
}, 37)

setTimeout(() => {
  deferConsole.count('log')
  deferConsole.event('myEvent')
  deferConsole.label('myLabel')
  deferConsole.count('log')
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
  collapsedConsole.warn('This will force the group to expand')
  collapsedConsole.count(COLLAPSED)
  collapsedConsole.event('myEvent')
}, 1235)

setTimeout(() => {
  timelessConsole.log('without time')
  timelessConsole.count('log')
  timelessConsole.event('noTime')
  timelessConsole.count('log')
}, 1235)
