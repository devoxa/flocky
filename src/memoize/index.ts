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
  const cache: Record<string, { data: TReturn; ttl: number }> = Object.create(
    null
  )

  return {
    get: (key: string) => {
      const value = cache[key]

      if (value && value.ttl >= new Date().getTime()) {
        return value.data
      }

      return undefined
    },
    set: (key: string, value: TReturn) => {
      cache[key] = { data: value, ttl: new Date().getTime() + ttl }
    },
  }
}
