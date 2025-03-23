/*!
 *  @module      auto-console-group
 *  @description Automagically group console messages
 *  @author      David J. Bradshaw
 *  @copyright  (c)2025 David J. Bradshaw. All rights reserved.
 *  @license     MIT
 */

import createConsoleGroup from 'auto-console-group'

const BLUE = 'color: #135CD2;'
const BLUE_LIGHT = 'color: #A9C7FB;'

const isDarkModeEnabled = (): boolean => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const HIGHLIGHT = isDarkModeEnabled() ? BLUE_LIGHT : BLUE

const consoleGroup = createConsoleGroup({
  label: 'auto-group-console',
  defaultEvent: 'RENAMED',
  showTime: false,
  collapsed: false,
})

consoleGroup.warn('This package has been renamed to %cauto-console-group%c', HIGHLIGHT)
consoleGroup.log('Please update your imports to use the new package name')
consoleGroup.info('%chttps://www.npmjs.com/package/auto-console-group', HIGHLIGHT)

export default createConsoleGroup
