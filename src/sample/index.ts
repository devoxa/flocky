/**
 * ### sample(array)
 *
 * Get a random element from the `array`.
 *
 * ```js
 * flocky.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * // -> 8
 * ```
 */

export function sample<T>(array: Array<T>): T {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

export default sample
