import { RecursiveUnionToIntersection, Simplify } from '../typeHelpers'

/**
 * ### unflatten(object)
 *
 * Unflattens an object with dot notation keys into a nested object.
 *
 * ```js
 * flocky.unflatten({ 'a.b': 1, 'a.c': 2, 'd.e.f': 3 })
 * // -> { a: { b: 1, c: 2 }, d: { e: { f: 3 } } }
 * ```
 */

type UnflattenObject<TObject extends Record<string, unknown>> = {
  [TKey in keyof TObject as TKey extends `${infer TKeyPrefix}.${string}`
    ? TKeyPrefix
    : TKey]: TKey extends `${string}.${infer TKeySuffix}`
    ? UnflattenObject<{ [key in TKeySuffix]: TObject[TKey] }>
    : TObject[TKey]
} extends infer TResult
  ? { [TResultKey in keyof TResult]: TResult[TResultKey] }
  : never

export function unflatten<TObject extends Record<string, unknown>>(object: TObject) {
  const result: any = {}

  for (const key in object) {
    const keys = key.split('.')
    let current = result

    for (let i = 0; i < keys.length; i++) {
      const part = keys[i]

      if (i === keys.length - 1) {
        current[part] = object[key]
      } else {
        if (!current[part]) current[part] = {}
        current = current[part]
      }
    }
  }

  return result as Simplify<RecursiveUnionToIntersection<UnflattenObject<TObject>>>
}
