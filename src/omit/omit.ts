type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

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

export function omit<T extends object, K extends keyof T>(object: T, keys: Array<K>): Omit<T, K> {
  const objectKeys = Object.keys(object) as Array<keyof T>

  const result: Partial<T> = {}
  for (let i = 0; i !== objectKeys.length; i++) {
    const objectKey = objectKeys[i] as K

    if (keys.indexOf(objectKey) === -1) {
      result[objectKey] = object[objectKey]
    }
  }

  return result as Omit<T, K>
}
