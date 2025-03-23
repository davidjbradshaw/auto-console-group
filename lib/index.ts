/*!
 *  @module      auto-console-group
 *  @description Automagically group console messages
 *  @author      David J. Bradshaw
 *  @copyright  (c)2025 David J. Bradshaw. All rights reserved.
 *  @license     MIT
 */

import createConsoleGroup from 'auto-console-group'

// const BOLD = 'font-weight: bold;'
// const NORMAL = 'font-weight: normal;'
// const ITALIC = 'font-style: italic;'
const BLUE = 'color: #135CD2;'
const BLUE_LIGHT = 'color: #A9C7FB;'
// const BLACK = 'color: black;'
// const WHITE = 'color: #E3E3E3;'

const isDarkModeEnabled = (): boolean => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const HIGHLIGHT = isDarkModeEnabled() ? BLUE_LIGHT : BLUE
// const FOREGROUND = isDarkModeEnabled() ? WHITE : BLACK

const consoleGroup = createConsoleGroup({
  label: 'AutoConsoleGroup',
  showTime: false,
  collapsed: false,
})

// Removed incorrect usage of consoleGroup.event
consoleGroup.warn('This package has been renamed to %cauto-console-group%c', HIGHLIGHT)
consoleGroup.log('Please update your imports to use the new package name')
consoleGroup.info('%chttps://www.npmjs.com/package/auto-console-group', HIGHLIGHT)

export default createConsoleGroup
