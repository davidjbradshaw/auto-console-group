import { createDeferConsole, createGroupConsole } from './lib/index'

window.createDeferConsole = createDeferConsole

const deferConsole = createDeferConsole({ label: 'Defer', defaultEvent: 'defer' })
const groupConsole = createGroupConsole({ label: 'Group' })

deferConsole.log('This will be logged after the group console')
deferConsole.event('event')
// deferConsole.showTime(false)

// groupConsole.event('event')
groupConsole.log('This will be logged in a group')
groupConsole.endAutoGroup()

groupConsole.event('secondEvent')
groupConsole.log('log 1')
groupConsole.log('log 2')
groupConsole.endAutoGroup()

groupConsole.event('thirdEvent')
groupConsole.showTime(false)
groupConsole.log('Without time')
groupConsole.log('log 4')
groupConsole.log('log 5')
groupConsole.showTime(true)
