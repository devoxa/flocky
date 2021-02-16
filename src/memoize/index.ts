type Serializer = (...args: Array<any>) => string

interface MemoizeOptions {
  serializer?: Serializer
  strategy?: 'monadic' | 'variadic'
}

export function memoize<
  TThis,
  TReturn,
  TFunc extends (...args: any[]) => TReturn
>(this: TThis, func: TFunc, options: MemoizeOptions = {}): TFunc {
  const cache = defaultCache()
  const serializer = options.serializer ? options.serializer : defaultSerializer
  const strategy =
    options.strategy === 'monadic' ||
    (options.strategy !== 'variadic' && func.length <= 1)
      ? monadic
      : variadic

  return strategy.bind(this, func, cache, serializer) as TFunc
}

function isPrimitive(value: any) {
  return (
    value == null || typeof value === 'number' || typeof value === 'boolean'
  )
}

function monadic<TThis, TReturn, TFunc extends (...args: any[]) => TReturn>(
  this: TThis,
  func: TFunc,
  cache: CacheInterface<TReturn>,
  serializer: Serializer,
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
  cache: CacheInterface<TReturn>,
  serializer: Serializer
) {
  const args = Array.prototype.slice.call(arguments, 3)
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

interface CacheInterface<TReturn> {
  get: (key: string) => TReturn | undefined
  set: (key: string, value: TReturn) => void
}

const defaultCache = <TReturn>(): CacheInterface<TReturn> => {
  const cache: Record<string, TReturn> = Object.create(null)

  return {
    get: (key: string) => cache[key],
    set: (key: string, value: TReturn) => {
      cache[key] = value
    },
  }
}
