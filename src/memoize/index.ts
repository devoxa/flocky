/**
 * ### memoize(func, options?)
 *
 * Creates a function that memoizes the result of `func`.
 *
 * ```js
 * const func = () => console.log('Heavy processing happening')
 * const memoizedFunc = flocky.memoize(func)
 * const memoizedFuncWithTtl = flocky.memoize(func, { ttl: 30 * 1000 })
 * ```
 */

interface MemoizeOptions {
  strategy?: MemoizeStrategy
  serializer?: MemoizeSerializer
  ttl?: number
}

type MemoizeStrategy = 'monadic' | 'variadic'

type MemoizeSerializer = (...args: Array<any>) => string

export function memoize<
  TThis,
  TReturn,
  TFunc extends (...args: any[]) => TReturn
>(this: TThis, func: TFunc, options: MemoizeOptions = {}): TFunc {
  const strategy =
    options.strategy === 'monadic' ||
    (options.strategy !== 'variadic' && func.length <= 1)
      ? monadic
      : variadic
  const cache = options.ttl ? ttlCache(options.ttl) : defaultCache()
  const serializer = options.serializer ? options.serializer : defaultSerializer

  return strategy.bind(this, func, cache, serializer) as TFunc
}

function isPrimitive(value: any) {
  // We can not treat strings as primitive, because they overwrite numbers
  return (
    value == null || typeof value === 'number' || typeof value === 'boolean'
  )
}

function monadic<TThis, TReturn, TFunc extends (...args: any[]) => TReturn>(
  this: TThis,
  func: TFunc,
  cache: MemoizeCache<TReturn>,
  serializer: MemoizeSerializer,
  arg: any
) {
  const cacheKey = isPrimitive(arg) ? arg : serializer(arg)

  let computedValue = cache.get(cacheKey)
  if (typeof computedValue === 'undefined') {
    computedValue = func.call(this, arg)
    cache.set(cacheKey, computedValue)
  }

  return computedValue
}

function variadic<TThis, TReturn, TFunc extends (...args: any[]) => TReturn>(
  this: TThis,
  func: TFunc,
  cache: MemoizeCache<TReturn>,
  serializer: MemoizeSerializer,
  ...args: Array<any>
) {
  const cacheKey = serializer(args)

  let computedValue = cache.get(cacheKey)
  if (typeof computedValue === 'undefined') {
    computedValue = func.apply(this, args)
    cache.set(cacheKey, computedValue)
  }

  return computedValue
}

function defaultSerializer(...args: Array<any>) {
  return JSON.stringify(args)
}

interface MemoizeCache<TReturn> {
  get: (key: string) => TReturn | undefined
  set: (key: string, value: TReturn) => void
}

const defaultCache = <TReturn>(): MemoizeCache<TReturn> => {
  const cache: Record<string, TReturn> = Object.create(null)

  return {
    get: (key: string) => cache[key],
    set: (key: string, value: TReturn) => {
      cache[key] = value
    },
  }
}

const ttlCache = <TReturn>(ttl: number): MemoizeCache<TReturn> => {
  type Timeout = ReturnType<typeof setTimeout>
  const timeouts: Record<string, Timeout> = Object.create(null)
  const cache: Record<string, TReturn> = Object.create(null)

  return {
    get: (key: string) => cache[key],
    set: (key: string, value: TReturn) => {
      if (timeouts[key]) {
        clearTimeout(timeouts[key])
      }

      cache[key] = value
      timeouts[key] = setTimeout(() => {
        delete cache[key]
        delete timeouts[key]
      }, ttl)
    },
  }
}