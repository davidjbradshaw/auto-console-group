import pkg from '../package.json' with { type: 'json' }

const date = new Date()
const year = date.getFullYear()
// const today = date.toISOString().split('T')[0]

export default () => `/*!
 *  @module      auto-console-group v${pkg.version}
 *
 *  @description Automagically group console logs in the browser console.
 *
 *  @author      ${pkg.author.name} <${pkg.author.email}>
 *  @see         {@link ${pkg.homepage}}
 *  @license     ${pkg.license}
 *
 *  @copyright  (c) ${year}, ${pkg.author.name}. All rights reserved.
 */
`
