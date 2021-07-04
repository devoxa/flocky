/**
 * ### duplicates(array, identity?)
 *
 * Create a version of an array, in which only the duplicated elements are kept.
 * The order of result values is determined by the order they occur in the array.
 * Can be passed an optional `identity` function to select the identifying part of objects.
 *
 * ```js
 * flocky.duplicates([1, 1, 2, 4, 2, 1, 6])
 * // -> [1, 2, 1]
 *
 * flocky.duplicates(['foo', 'bar', 'foo', 'foobar'])
 * // -> ['foo']
 *
 * const input = [{ id: 1, a: 1 }, { id: 1, a: 2 }, { id: 2, a: 3 }, { id: 1, a: 4 }]
 * flocky.duplicates(input, (element) => element.id)
 * // -> [{ id: 1, a: 2 }, { id: 1, a: 4 }]
 * ```
 */

export function duplicates<T>(array: Array<T>, identity?: (x: T) => any): Array<T> {
  if (!identity) {
    return primitiveDuplicates(array)
  }

  return objectDuplicates(array, identity)
}

function primitiveDuplicates<T>(array: Array<T>): Array<T> {
  return array.filter((x, i, self) => self.indexOf(x) !== i)
}

function objectDuplicates<T>(array: Array<T>, identity: (x: T) => any): Array<T> {
  const identities = array.map((x) => identity(x))
  return array.filter((_, i) => identities.indexOf(identities[i]) !== i)
}
