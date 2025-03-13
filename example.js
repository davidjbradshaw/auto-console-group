import { createDeferConsole, createGroupConsole } from './lib/index'

window.createDeferConsole = createDeferConsole

const deferConsole = createDeferConsole({ title: 'Defer Console' })
const groupConsole = createGroupConsole({ title: 'Group Console' })

deferConsole.log('This will be logged after the group console')
groupConsole.log('This will be logged in a group')
