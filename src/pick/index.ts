/**
 * ### pick(object, keys)
 *
 * Create an object composed of the specified `keys`.
 *
 * ```js
 * const object = { 'a': 1, 'b': 2, 'c': 3 }
 * flocky.pick(object, ['a', 'c'])
 * // -> { "a": 1, "c": 3 }
 * ```
 */

function pick<T extends object, U extends keyof T>(
  object: T,
  keys: Array<U>
): Pick<T, U> {
  let result: Partial<T> = {}

  keys.forEach((key) => {
    result[key] = object[key]
  })

  return result as Pick<T, U>
}

export = pick
