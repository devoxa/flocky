/**
 * ### random(lower, upper, float?)
 *
 * Generate a random number between `lower` and `upper` (inclusive).
 * If `float` is true or `lower` or `upper` is a float, a float is returned instead of an integer.
 *
 * ```js
 * flocky.random(1, 10)
 * // -> 8
 *
 * flocky.random(1, 20, true)
 * // -> 14.94849340769861
 *
 * flocky.random(2.5, 3.5)
 * // -> 3.2341312319841373
 * ```
 */

export function random(lower: number, upper: number, float?: boolean): number {
  if (float || lower % 1 || upper % 1) {
    return randomFloat(lower, upper)
  }

  return randomInteger(lower, upper)
}

function randomFloat(lower: number, upper: number): number {
  return Math.random() * (upper - lower) + lower
}

function randomInteger(lower: number, upper: number): number {
  return Math.floor(Math.random() * (upper - lower + 1) + lower)
}

export default random
