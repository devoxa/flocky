/**
 * ### identifier()
 *
 * Generate a random identifier with UUID v4 format.
 *
 * ```js
 * flocky.identifier()
 * // -> 'bfc8d57e-b9ab-4245-836e-d1fd99602e30'
 * ```
 */

export function identifier(): string {
  let seed = Date.now()
  let uuid = ''

  for (let i = 0; i !== 36; i++) {
    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    //         ^    ^    ^    ^
    // These spots have to be dashes
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += '-'
      continue
    }

    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    //               ^
    // This spot has to be a "4"
    if (i === 14) {
      uuid += '4'
      continue
    }

    // Generate a random byte and adjust the seed for the next random byte
    const randomByte = (seed + Math.random() * 16) % 16 | 0
    seed = Math.floor(seed / 16)

    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    //                    ^
    // This spot has to be either "8", "9", "a" or "b". The bit-shifting
    // magic below achieves exactly that.
    if (i === 19) {
      uuid += ((randomByte & 0x3) | 0x8).toString(16)
      continue
    }

    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    // ^^^^^^^^ ^^^^  ^^^  ^^^ ^^^^^^^^^^^^
    // These spots can just be random bytes (0-9, A-F)
    uuid += randomByte.toString(16)
  }

  return uuid
}
