/**
 * ### omit(object, keys)
 *
 * Create an object composed of all existing keys that are not specified in `keys`.
 *
 * ```js
 * const object = { 'a': 1, 'b': 2, 'c': 3 }
 * flocky.omit(object, ['a'])
 * // -> { "b": 2, "c": 3 }
 * ```
 */

type Omit<T, U> = Pick<T, Exclude<keyof T, U>>

function omit<T extends object, U extends keyof T>(
  object: T,
  keys: Array<U>
): Omit<T, U> {
  let result: Partial<T> = {}

  let remainingKeys = Object.keys(object) as Array<keyof T>
  remainingKeys = remainingKeys.filter((x) => !keys.includes(x as U))

  remainingKeys.forEach((key) => {
    result[key] = object[key]
  })

  return result as Omit<T, U>
}

export = omit
