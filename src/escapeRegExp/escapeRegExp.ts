/**
 * ### escapeRegExp(string)
 *
 * Escapes special characters in a string for use in a regular expression.
 *
 * ```js
 * flocky.escapeRegExp('Hey. (1 + 1 = 2)')
 * // -> 'Hey\\. \\(1 \\+ 1 = 2\\)'
 * ```
 */

// The implementation of this function is taken from MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default escapeRegExp
