/**
 * ### debounce(func, wait)
 *
 * Creates a debounced function that delays invoking `func` until `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * ```js
 * const func = () => console.log('Heavy processing happening')
 * const debouncedFunc = flocky.debounce(func, 250)
 * ```
 */

export function debounce<TFunc extends (...args: any[]) => void>(
  func: TFunc,
  wait: number
) {
  let timeoutID: number | null = null

  return function (this: any, ...args: any[]) {
    timeoutID && clearTimeout(timeoutID)
    timeoutID = window.setTimeout(() => func.apply(this, args), wait)
  } as (...args: Parameters<TFunc>) => void
}


