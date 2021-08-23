/* eslint-disable @typescript-eslint/ban-types */

// Return all keys of an object that have value types we can use as a map key
type MappableKeys<T> = NonNullable<
  {
    [K in keyof T]: T[K] extends string | number | undefined ? K : never
  }[keyof T]
>

/**
 * ### toMap(array, key, target?)
 *
 * Create a lookup map out of an `array` of objects, with a lookup `key` and an optional `target`.
 *
 * ```js
 * flocky.toMap(
 *   [
 *     { id: 1, name: 'Stanley', age: 64 },
 *     { id: 2, name: 'Juliet', age: 57 },
 *     { id: 3, name: 'Alex', age: 19 }
 *   ],
 *   'id'
 * )
 * // -> {
 * // ->   1: { id: 1, name: 'Stanley', age: 64 },
 * // ->   2: { id: 2, name: 'Juliet', age: 57 },
 * // ->   3: { id: 3, name: 'Alex', age: 19 }
 * // -> }
 *
 * flocky.toMap(
 *   [
 *     { id: 1, name: 'Stanley', age: 64 },
 *     { id: 2, name: 'Juliet', age: 57 },
 *     { id: 3, name: 'Alex', age: 19 }
 *   ],
 *   'name',
 *   'age'
 * )
 * // -> { Stanley: 64, Juliet: 57, Alex: 19 }
 * ```
 */

export function toMap<Element extends object, Key extends MappableKeys<Element>>(
  array: Array<Element>,
  key: Key
): { [key: string]: Element | undefined }

export function toMap<
  Element extends object,
  Key extends MappableKeys<Element>,
  Target extends keyof Element
>(array: Array<Element>, key: Key, target: Target): { [key: string]: Element[Target] | undefined }

export function toMap<
  Element extends object,
  Key extends MappableKeys<Element>,
  Target extends keyof Element
>(
  array: Array<Element>,
  key: Key,
  target?: Target
): { [key: string]: Element | Element[Target] | undefined } {
  const map: { [key: string]: Element | Element[Target] | undefined } = {}

  array.map((element) => {
    if (!element[key]) return
    map[element[key] as unknown as string] = target ? element[target] : element
  })

  return map
}
