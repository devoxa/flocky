/**
 * ### hash(data)
 *
 * Create a hashed string representation of the passed in data.
 *
 * :warning: **This function is not cryptographically secure, use [bcrypt](https://www.npmjs.com/package/bcrypt)
 * for anything security related.**
 *
 * ```js
 * flocky.hash('some really long string')
 * // -> "x1nr7uiv"
 *
 * flocky.hash({id: 'AAA', name: 'BBB'})
 * // -> "x16mynva"
 * ```
 *
 * <details>
 *   <summary>Implementation Details</summary>
 *
 *   This method uses Murmur3 because it is small, fast and has fairly good
 *   collision characteristics (about 1 in 36000).
 *
 *   - https://softwareengineering.stackexchange.com/questions/49550
 *   - https://github.com/VowpalWabbit/vowpal_wabbit/wiki/murmur2-vs-murmur3
 *   - https://en.wikipedia.org/wiki/MurmurHash
 *   - https://github.com/whitequark/murmurhash3-js/blob/master/murmurhash3.js
 * </details>
 */

function hash(data: any): string {
  // Convert any data into a string
  data = JSON.stringify(data)

  // Setup length, seed and chunk looping
  const len = data.length
  let hash = len ^ len
  let roundedEnd = len & ~0x1

  // Go through 4-byte chunks
  for (let i = 0; i < roundedEnd; i += 2) {
    let chunk = data.charCodeAt(i) | (data.charCodeAt(i + 1) << 16)

    chunk = mul32(chunk, 0xcc9e2d51)
    chunk = ((chunk & 0x1ffff) << 15) | (chunk >>> 17)
    chunk = mul32(chunk, 0x1b873593)

    hash ^= chunk
    hash = ((hash & 0x7ffff) << 13) | (hash >>> 19)
    hash = (hash * 5 + 0xe6546b64) | 0
  }

  // Handle remaining bytes
  if (len % 2 === 1) {
    let remaining = data.charCodeAt(roundedEnd)

    remaining = mul32(remaining, 0xcc9e2d51)
    remaining = ((remaining & 0x1ffff) << 15) | (remaining >>> 17)
    remaining = mul32(remaining, 0x1b873593)

    hash ^= remaining
  }

  // Finalize
  hash ^= len << 1
  hash ^= hash >>> 16
  hash = mul32(hash, 0x85ebca6b)
  hash ^= hash >>> 13
  hash = mul32(hash, 0xc2b2ae35)
  hash ^= hash >>> 16

  // Convert to string, ensuring start with character
  return 'x' + (hash >>> 0).toString(36)
}

// Multiply two 32-bit numbers
function mul32(m: number, n: number) {
  const nLow = n & 0xffff
  const nHigh = n - nLow

  return (((nHigh * m) | 0) + ((nLow * m) | 0)) | 0
}

export = hash
