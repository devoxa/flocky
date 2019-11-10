/**
 * ### get(object, path, defaultValue?)
 *
 * Get the value at a `path` of an `object` (with an optional `defaultValue`)
 *
 * :warning: **Using this method will ignore type information, and you will have
 * to type the return type yourself. If you can, it is always better to access
 * properties directly, for example with the "optional chaining" operator.**
 *
 * ```js
 * const object = {a: {b: {c: 1}}}
 * flocky.get(object, 'a.b.c')
 * // -> 1
 *
 * const object = {a: {b: {c: 1}}}
 * flocky.get(object, 'x.x.x')
 * // -> undefined
 *
 * const object = {a: {b: {c: 1}}}
 * flocky.get(object, 'x.x.x', 'default')
 * // -> "default"
 * ```
 */

const REPLACE_EMPTY = /]|^\[/g
const REPLACE_DOT = /\.?\[/g

export function get(
  object: object | null | undefined,
  path: string | Array<string | number>,
  defaultValue?: any
): any {
  // Handle the case that the object is undefined or not an object
  if (!object || Object(object) !== object) {
    return defaultValue
  }

  // A) If the path is an array, we can just use that
  // B) If the path is a string, convert it into an array by migrating
  //    array-style `[foo]` accessors into object-style `.foo` accessors
  const arrayPath = Array.isArray(path) ? path : parsePath(path)
  const result = getWithArrayPath(object, arrayPath)
  return result !== undefined ? result : defaultValue
}

function parsePath(path: string): Array<string> {
  return path
    .replace(REPLACE_EMPTY, '')
    .replace(REPLACE_DOT, '.')
    .split('.')
}

function getWithArrayPath(object: object, path: Array<string | number>): any {
  const length = path.length
  let index = 0
  let current: any = object

  while (current != null && index < length) {
    current = current[path[index++]]
  }

  return index === length ? current : undefined
}
