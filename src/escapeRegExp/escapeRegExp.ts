/**
 * ### escapeRegExp(string)
 *
 * Escape special characters in a string for use in a regular expression.
 *
 * ```js
 * flocky.escapeRegExp('Hey. (1 + 1 = 2)')
 * // -> 'Hey\\. \\(1 \\+ 1 = 2\\)'
 * ```
 */

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
