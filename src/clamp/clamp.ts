/**
 * ### clamp(value, min, max)
 *
 * Clamps a value within a minimum and maximum range (inclusive).
 *
 * ```js
 * flocky.clamp(3, 0, 5)
 * // -> 3
 *
 * flocky.clamp(10, 0, 5)
 * // -> 5
 *
 * flocky.clamp(-10, 0, 5)
 * // -> 0
 * ```
 */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
