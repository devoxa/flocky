/**
 * ### flocky.sum(array)
 *
 * Compute the sum of the values in an array
 *
 * ```js
 * flocky.sum([1, 4, 2, -3, 0])
 * // -> 4
 * ```
 */

function sum(array: Array<number>): number {
  return array.reduce((a, b) => a + b, 0)
}

export = sum
