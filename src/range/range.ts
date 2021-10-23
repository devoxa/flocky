/**
 * ### range(start, end, step?)
 *
 * Generate an array of numbers progressing from `start` up to and including `end`.
 *
 * ```js
 * flocky.range(0, 5)
 * // -> [0, 1, 2, 3, 4, 5]
 *
 * flocky.range(-5, -10)
 * // -> [-5, -6, -7, -8, -9, -10]
 *
 * flocky.range(-6, -12, 2)
 * // -> [-6, -8, -10, -12]
 * ```
 */

export function range(start: number, end: number, step = 1): Array<number> {
  const array = []
  const positive = start <= end
  let value = start

  if (positive) {
    while (value <= end) {
      array.push(value)
      value += step
    }
  } else {
    while (value >= end) {
      array.push(value)
      value -= step
    }
  }

  return array
}
