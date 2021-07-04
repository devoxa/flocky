/**
 * ### min(array)
 *
 * Compute the minimum of the values in an array.
 *
 * ```js
 * flocky.min([1, 4, 2, -3, 0])
 * // -> -3
 * ```
 */

export function min(array: Array<number>): number {
  return Math.min.apply(null, array)
}

export default min
