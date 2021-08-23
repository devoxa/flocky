type PromiseFunction<T> = () => Promise<T>

/**
 * ### promisePool(promiseFunctions, limit)
 *
 * Run multiple promise-returning functions in parallel with limited concurrency.
 *
 * ```js
 * await flocky.promisePool([
 *   () => Promise.resolve(1),
 *   () => Promise.resolve(2),
 *   () => Promise.resolve(3),
 *   () => Promise.resolve(4),
 * ], 2)
 * // -> [1, 2, 3, 4]
 * ```
 */

export async function promisePool<T>(
  promiseFunctions: Array<PromiseFunction<T>>,
  limit: number
): Promise<Array<T>> {
  const results: Array<T> = []

  const iterator = promiseFunctions.entries()
  const workers = new Array(limit).fill(iterator).map(async (iterator) => {
    for (const [index, func] of iterator) {
      results[index] = await func()
    }
  })

  await Promise.all(workers)
  return results
}
