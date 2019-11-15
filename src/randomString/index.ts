/**
 * ### randomString(length)
 *
 * Generate a random alphanumeric string with length `length`.
 *
 * ```js
 * flocky.randomString(5)
 * // -> 'tfl0g'
 * ```
 */

const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function randomString(length: number): string {
  let string = ''

  for (let i = 0; i !== length; i++) {
    const index = Math.floor(Math.random() * CHARACTERS.length)
    string += CHARACTERS.charAt(index)
  }

  return string
}

export default randomString
