/**
 * ### compact(array)
 *
 * Create an array with all falsy (`undefined`, `null`, `false`, `0`, `NaN`, `''`) values removed.
 *
 * ```js
 * flocky.compact([1, 2, 3, null, 4, false, 0, NaN, 5])
 * // -> [1, 2, 3, 4, 5]
 * ```
 */

type Falsy = undefined | null | false | 0 | ''

export function compact<T>(array: Array<T | Falsy>): Array<T> {
  return array.filter(Boolean) as Array<T>
}
