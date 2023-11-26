import { TAnyFunction } from '../typeHelpers'

/**
 * ### throttle(func, wait)
 *
 * Create a throttled function that invokes `func` at most every `wait` milliseconds.
 * If the invocation is throttled, `func` will be invoked with the last arguments provided.
 *
 * ```js
 * const func = () => console.log('Heavy processing happening')
 * const throttledFunc = flocky.throttle(func, 250)
 * ```
 */

export function throttle<TFunc extends TAnyFunction<void>>(func: TFunc, wait: number) {
  let timeoutID: NodeJS.Timeout | null = null
  let lastCall = 0

  return function (this: unknown, ...args: unknown[]) {
    timeoutID && clearTimeout(timeoutID)

    const remainingWait = wait - (Date.now() - lastCall)

    const callFunc = () => {
      func.apply(this, args)
      lastCall = Date.now()
    }

    // Immediately call the function if we don't have to throttle it
    if (remainingWait <= 0 || remainingWait > wait) {
      return callFunc()
    }

    timeoutID = setTimeout(() => callFunc(), remainingWait)
  } as (...args: Parameters<TFunc>) => void
}
