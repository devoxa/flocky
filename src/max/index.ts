/**
 * ### max(array)
 *
 * Compute the maximum of the values in an array.
 *
 * ```js
 * flocky.max([1, 4, 2, -3, 0])
 * // -> 4
 * ```
 */

function max(array: Array<number>): number {
  return Math.max.apply(null, array)
}

export = max
