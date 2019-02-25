/**
 * ### average(array)
 *
 * Compute the average of the values in an array.
 *
 * ```js
 * flocky.average([1, 4, 2, -4, 0])
 * // -> 0.6
 * ```
 */

function average(array: Array<number>): number {
  return array.reduce((a, b) => a + b, 0) / array.length
}

export = average
