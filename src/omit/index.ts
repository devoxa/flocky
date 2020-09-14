/**
 * ### omit(object, keys)
 *
 * Create an object composed of all existing keys that are not specified in `keys`.
 *
 * ```js
 * const object = { a: 1, b: 2, c: 3 }
 * flocky.omit(object, ['a'])
 * // -> { b: 2, c: 3 }
 * ```
 */

type Omit<T, U> = Pick<T, Exclude<keyof T, U>>

export function omit<T extends object, U extends keyof T>(
  object: T,
  keys: Array<U>
): Omit<T, U> {
  const objectKeys = Object.keys(object) as Array<keyof T>

  let result: Partial<T> = {}
  for (let i = 0; i !== objectKeys.length; i++) {
    const objectKey = objectKeys[i] as U

    if (keys.includes(objectKey)) {
      result[objectKey] = object[objectKey]
    }
  }

  return result as Omit<T, U>
}

export default omit
