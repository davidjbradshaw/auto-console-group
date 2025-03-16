import createGroupConsole from './lib/index'

const deferConsole = createGroupConsole({ defaultEvent: 'Event' })
const timelessConsole = createGroupConsole({ showTime: false })
const collapsedConsole = createGroupConsole({ label: 'Auto Collapsed Group', collapsed: true })

setTimeout(() => {
  deferConsole.log('This will be logged at the end of the current Event Loop')
}, 37)

setTimeout(() => {
  deferConsole.log('log 1')
  deferConsole.event('myEvent')
  deferConsole.label('myLabel')
  deferConsole.log('log 2')
}, 486)

setTimeout(() => {
  collapsedConsole.log('Collapsed group 1')
  collapsedConsole.log('Collapsed group 2')
  collapsedConsole.log('Collapsed group 3')
  collapsedConsole.event('myEvent')
}, 1234)

setTimeout(() => {
  collapsedConsole.log('Collapsed group 1')
  collapsedConsole.warn('This will force the group to expand')
  collapsedConsole.log('Collapsed group 3')
  collapsedConsole.event('myEvent')
}, 1235)

setTimeout(() => {
  timelessConsole.log('Without time')
  timelessConsole.log('log 4')
  timelessConsole.event('noTime')
  timelessConsole.log('log 5')
}, 1235)
