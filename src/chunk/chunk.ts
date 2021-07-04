/**
 * ### chunk(array, size)
 *
 * Split an array of elements into groups of `size`.
 * If the array can't be split evenly, the final chunk will contain the remaining elements.
 *
 * ```js
 * flocky.chunk([1, 2, 3, 4, 5, 6, 7], 3)
 * // -> [[1, 2, 3], [4, 5, 6], [7]]
 * ```
 */

export function chunk<T>(array: Array<T>, size: number): Array<Array<T>> {
  let chunked: Array<Array<T>> = []

  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size))
  }

  return chunked
}

export default chunk
