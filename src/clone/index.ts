/**
 * ### clone(value)
 *
 * Create a deep clone of `value`.
 * This method only supports types native to JSON, so all primitive types, arrays and objects.
 *
 * ```js
 * const original = [{ "a": 1 }, { "b": 2 }]
 * const clone = flocky.clone(original)
 * original[0] === clone[0]
 * // -> false
 * ```
 */

type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSONObject
  | JSONArray

interface JSONObject {
  [key: string]: JSONValue
}

interface JSONArray extends Array<JSONValue> {}

export function clone<T extends JSONValue>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export default clone
