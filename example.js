import { createDeferConsole, createGroupConsole } from './lib/index'

const deferConsole = createDeferConsole({ label: 'Auto Deferred Group', defaultEvent: 'Event' })
const groupConsole = createGroupConsole()
const timelessConsole = createDeferConsole({ showTime: false })
const collapsedConsole = createDeferConsole({ label: 'Auto Collapsed Group', collapsed: true })

deferConsole.log('This will be logged after the group console')
groupConsole.log('This will be logged in a group')

setTimeout(() => {
  deferConsole.log('log 1')
  deferConsole.event('myEvent')
  deferConsole.label('myLabel')
  deferConsole.log('log 2')
})

setTimeout(() => {
  collapsedConsole.log('This will be logged in a collapsed group 1')
  collapsedConsole.log('This will be logged in a collapsed group 2')
  collapsedConsole.log('This will be logged in a collapsed group 3')
  collapsedConsole.event('myEvent')
})

setTimeout(() => {
  timelessConsole.log('Without time')
  timelessConsole.log('log 4')
  timelessConsole.event('noTime')
  timelessConsole.log('log 5')
})
