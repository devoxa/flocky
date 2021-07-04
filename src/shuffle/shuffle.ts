/**
 * ### shuffle(array)
 *
 * Create an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm).
 *
 * ```js
 * flocky.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * // -> [3, 7, 2, 1, 10, 4, 6, 9, 5, 8]
 * ```
 */

export function shuffle<T>(array: Array<T>): Array<T> {
  // Create a copy of the array so we don't mutate the input
  array = array.concat()

  // Treat the end of the array as shuffled and the start as unshuffled.
  // The shuffling is accomplished by going through the array from end to start,
  // generating a random index up to the current index, and then swapping the
  // place of the element at that random index with the current index.
  //
  // ['a', 'b', 'c', 'd', 'e']
  //                       ^ Random index between 0 - 4 (e.g. 2: swap 'e' with 'c')
  // ['a', 'b', 'e', 'd', 'c']
  //                  ^ Random index between 0 - 3 (e.g. 1: swap 'd' with 'b')
  // ['a', 'd', 'e', 'b', 'c']
  //             ^ Random index between 0 - 2 (e.g. 0: swap 'e' with 'a')
  // ['e', 'd', 'a', 'b', 'c']
  //        ^ Random index between 0 - 1 (e.g. 0: swap 'd' with 'e')
  // ['d', 'e', 'a', 'b', 'c']
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))

    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }

  return array
}


