/**
 * ### unique(array, identity?)
 *
 * Create a duplicate-free version of an array, in which only the first occurrence of each element is kept.
 * The order of result values is determined by the order they occur in the array.
 * Can be passed an optional `identity` function to select the identifying part of objects.
 *
 * ```js
 * flocky.unique([1, 1, 2, 4, 2, 1, 6])
 * // -> [1, 2, 4, 6]
 *
 * flocky.unique(['foo', 'bar', 'foo', 'foobar'])
 * // -> ['foo', 'bar', 'foobar']
 *
 * const input = [{ id: 1, a: 1 }, { id: 1, a: 2 }, { id: 2, a: 3 }, { id: 1, a: 4 }]
 * flocky.unique(input, (element) => element.id)
 * // -> [{ id: 1, a: 1 }, { id: 2, a: 3 }]
 * ```
 */

export function unique<T>(array: Array<T>, identity?: (x: T) => any): Array<T> {
  if (!identity) {
    return primitiveUnique(array)
  }

  return objectUnique(array, identity)
}

function primitiveUnique<T>(array: Array<T>): Array<T> {
  return array.filter((x, i, self) => self.indexOf(x) === i)
}

function objectUnique<T>(array: Array<T>, identity: (x: T) => any): Array<T> {
  const identities = array.map((x) => identity(x))
  return array.filter((x, i) => identities.indexOf(identity(x)) === i)
}

export default unique
