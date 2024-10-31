/**
 * ### flatten(object)
 *
 * Flattens a nested object into an object with dot notation keys.
 *
 * ```js
 * flocky.flatten({ a: { b: 1, c: 2 }, d: { e: { f: 3 } } })
 * // -> { 'a.b': 1, 'a.c': 2, 'd.e.f': 3 }
 * ```
 */

type Entry = { key: string; value: unknown; optional: boolean }

type Explode<T> = _Explode<T extends readonly unknown[] ? { '0': T[number] } : T>

type _Explode<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? Explode<T[K]> extends infer E
          ? E extends Entry
            ? {
                key: `${K}${E['key'] extends '' ? '' : '.'}${E['key']}`
                value: E['value']
                optional: E['key'] extends ''
                  ? object extends Pick<T, K>
                    ? true
                    : false
                  : E['optional']
              }
            : never
          : never
        : never
    }[keyof T]
  : { key: ''; value: T; optional: false }

type Collapse<T extends Entry> = {
  [E in Extract<T, { optional: false }> as E['key']]: E['value']
} & Partial<{ [E in Extract<T, { optional: true }> as E['key']]: E['value'] }> extends infer O
  ? { [K in keyof O]: O[K] }
  : never

type FlattenObject<T> = Collapse<Explode<T>>

export function flatten<TObject extends Record<string, unknown>>(object: TObject) {
  const result: Record<string, unknown> = {}

  function recurse(current: Record<string, unknown>, prefix = '') {
    for (const key in current) {
      const value = current[key]
      const nextKey = prefix ? `${prefix}.${key}` : key

      if (typeof value === 'object' && value !== null) {
        recurse(value as Record<string, unknown>, nextKey)
      } else {
        result[nextKey] = value
      }
    }
  }

  recurse(object)
  return result as FlattenObject<TObject>
}
