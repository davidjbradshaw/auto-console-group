import { createDeferConsole, createGroupConsole } from './lib/index'

window.createDeferConsole = createDeferConsole

const deferConsole = createDeferConsole({ title: 'Defer', defaultEvent: 'defer' })
const groupConsole = createGroupConsole({ title: 'Group' })

deferConsole.log('This will be logged after the group console')
deferConsole.event('event')

// groupConsole.event('event')
groupConsole.log('This will be logged in a group')
groupConsole.endAutoGroup()

groupConsole.event('secondEvent')
groupConsole.log('log 1')
groupConsole.log('log 2')
groupConsole.endAutoGroup()

groupConsole.log('log 3')
