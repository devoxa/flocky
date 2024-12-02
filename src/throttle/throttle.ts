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

type FunctionWithVoidReturn<TFunc extends TAnyFunction<void>> = (...args: Parameters<TFunc>) => void

export function throttle<TFunc extends TAnyFunction<void>>(
  func: TFunc,
  wait: number
): FunctionWithVoidReturn<TFunc> {
  let timeoutID: NodeJS.Timeout | null = null
  let lastCall = 0

  return function (this: unknown, ...args: unknown[]) {
    if (timeoutID) clearTimeout(timeoutID)

    const remainingWait = wait - (Date.now() - lastCall)

    const callFunc = (): void => {
      func.apply(this, args)
      lastCall = Date.now()
    }

    // Immediately call the function if we don't have to throttle it
    if (remainingWait <= 0 || remainingWait > wait) {
      return callFunc()
    }

    timeoutID = setTimeout(() => callFunc(), remainingWait)
  } as FunctionWithVoidReturn<TFunc>
}
