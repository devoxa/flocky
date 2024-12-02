import { TAnyFunction } from '../typeHelpers'

/**
 * ### debounce(func, wait)
 *
 * Create a debounced function that delays invoking `func` until `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * ```js
 * const func = () => console.log('Heavy processing happening')
 * const debouncedFunc = flocky.debounce(func, 250)
 * ```
 */

type FunctionWithVoidReturn<TFunc extends TAnyFunction<void>> = (...args: Parameters<TFunc>) => void

export function debounce<TFunc extends TAnyFunction<void>>(
  func: TFunc,
  wait: number
): FunctionWithVoidReturn<TFunc> {
  let timeoutID: NodeJS.Timeout | null = null

  return function (this: unknown, ...args: unknown[]) {
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => func.apply(this, args), wait)
  } as FunctionWithVoidReturn<TFunc>
}
