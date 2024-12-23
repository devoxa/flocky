import { JSONValue } from '../typeHelpers'

/**
 * ### clone(value)
 *
 * Create a deep clone of `value`.
 * This method only supports types native to JSON, so all primitive types, arrays and objects.
 *
 * ```js
 * const original = [{ a: 1 }, { b: 2 }]
 * const clone = flocky.clone(original)
 * original[0] === clone[0]
 * // -> false
 * ```
 */

export function clone<T extends JSONValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}
