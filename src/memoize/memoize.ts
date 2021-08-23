import { TAnyFunction } from '../typeHelpers'

interface MemoizeOptions {
  strategy?: MemoizeStrategy
  serializer?: MemoizeSerializer
  ttl?: number
}

type MemoizeStrategy = 'monadic' | 'variadic'

type MemoizeSerializer = (data: unknown) => string

/**
 * ### memoize(func, options?)
 *
 * Create a function that memoizes the return value of `func`.
 *
 * ```js
 * const func = (a, b) => a + b
 * const memoizedFunc = flocky.memoize(func)
 * const memoizedFuncWithTtl = flocky.memoize(func, { ttl: 30 * 1000 })
 * memoizedFunc(1, 2)
 * // -> 3
 * ```
 *
 * <details>
 *   <summary>Implementation Details</summary>
 *
 *   This method's implementation is based on [fast-memoize](https://github.com/caiogondim/fast-memoize.js),
 *   with some improvements for variadic performance and additional support for a TTL based cache.
 * </details>
 */

export function memoize<TThis, TReturn, TFunc extends TAnyFunction<TReturn>>(
  this: TThis,
  func: TFunc,
  options: MemoizeOptions = {}
): TFunc {
  const strategy =
    options.strategy === 'monadic' || (options.strategy !== 'variadic' && func.length <= 1)
      ? monadic
      : variadic
  const cache = options.ttl ? ttlCache(options.ttl) : defaultCache()
  const serializer = options.serializer ? options.serializer : defaultSerializer

  return strategy.bind(this, func, cache, serializer) as TFunc
}

function isPrimitive(value: unknown): value is string {
  // We can not treat strings as primitive, because they overwrite numbers
  return value == null || typeof value === 'number' || typeof value === 'boolean'
}

function monadic<TThis, TReturn, TFunc extends TAnyFunction<TReturn>>(
  this: TThis,
  func: TFunc,
  cache: MemoizeCache<TReturn>,
  serializer: MemoizeSerializer,
  arg: unknown
) {
  const cacheKey = isPrimitive(arg) ? arg : serializer(arg)

  let value = cache.get(cacheKey)
  if (typeof value === 'undefined') {
    value = func.call(this, arg)
    cache.set(cacheKey, value)
  }

  return value
}

function variadic<TThis, TReturn, TFunc extends TAnyFunction<TReturn>>(
  this: TThis,
  func: TFunc,
  cache: MemoizeCache<TReturn>,
  serializer: MemoizeSerializer,
  ...args: Array<unknown>
) {
  const cacheKey = serializer(args)

  let value = cache.get(cacheKey)
  if (typeof value === 'undefined') {
    value = func.apply(this, args)
    cache.set(cacheKey, value)
  }

  return value
}

function defaultSerializer(data: unknown) {
  return JSON.stringify(data)
}

interface MemoizeCache<TReturn> {
  get: (key: string) => TReturn | undefined
  set: (key: string, value: TReturn) => void
}

function defaultCache<TReturn>(): MemoizeCache<TReturn> {
  const cache: Record<string, TReturn> = Object.create(null)

  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value
    },
  }
}

function ttlCache<TReturn>(ttl: number): MemoizeCache<TReturn> {
  const cache: Record<string, TReturn> = Object.create(null)

  return {
    get: (key) => cache[key],
    set: (key, value) => {
      cache[key] = value

      // Note: We do not need to clear the timeout because we never set a key
      // if it still exists in the cache.
      setTimeout(() => {
        delete cache[key]
      }, ttl)
    },
  }
}
