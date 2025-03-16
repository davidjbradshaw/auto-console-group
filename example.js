import { createDeferConsole, createGroupConsole } from './lib/index'

window.createDeferConsole = createDeferConsole

const deferConsole = createDeferConsole({ defaultEvent: 'deferredEvent' })
const groupConsole = createGroupConsole()

deferConsole.log('This will be logged after the group console')
groupConsole.log('This will be logged in a group')

setTimeout(() => {
  groupConsole.event('myEvent')
  groupConsole.label('myLabel')
  groupConsole.log('log 1')
  groupConsole.log('log 2')
})

setTimeout(() => {
  groupConsole.label('Auto Group')
  groupConsole.event('thirdEvent')
  groupConsole.showTime(false)
  groupConsole.log('Without time')
  groupConsole.log('log 4')
  groupConsole.log('log 5')
  groupConsole.showTime(true)
})
