/*!
 *  @module      auto-console-group
 *  @description Automagically group console messages
 *  @author      David J. Bradshaw
 *  @copyright  (c)2025 David J. Bradshaw. All rights reserved.
 *  @license     MIT
 */

import createDeferConsole from './defer-console'
import createRealTimeConsole from './real-time-console'

export { createRealTimeConsole }
export default createDeferConsole
