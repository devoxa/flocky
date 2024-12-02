/**
 * ### promiseTimeout(promise, timeoutMs)
 *
 * Reject a promise if it does not resolve within `timeoutMs`.
 *
 * :warning: **When the timeout is hit, a promise rejection will be thrown. However,
 * since promises are not cancellable, the execution of the promise itself will continue
 * until it resolves or rejects.**
 *
 * ```js
 * await flocky.promiseTimeout(Promise.resolve(1), 10)
 * // -> 1
 * ```
 */

export async function promiseTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: NodeJS.Timeout
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new PromiseTimeoutError()), timeoutMs)
  })

  return Promise.race([promise, timeoutPromise]).then((result) => {
    clearTimeout(timeoutId)
    return result as T
  })
}

export class PromiseTimeoutError extends Error {
  constructor() {
    super('Promise timed out')
  }
}
