/**
 * ### percentile(array, k)
 *
 * Compute the kth percentile of the values in an array.
 *
 * ```js
 * flocky.percentile([90, 85, 65, 72, 82, 96, 70, 79, 68, 84], 0.9)
 * // -> 90.6
 * ```
 */

export function percentile(array: Array<number>, k: number): number {
  const values = Array.from(array).sort((a, b) => a - b)
  const position = (values.length - 1) * k
  const baseIndex = Math.floor(position)

  if (values[baseIndex] === undefined) {
    return NaN
  }

  if (values[baseIndex + 1] === undefined) {
    return values[baseIndex]
  }

  const restPosition = position - baseIndex
  return values[baseIndex] + (values[baseIndex + 1] - values[baseIndex]) * restPosition
}
