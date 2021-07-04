import lodash from 'lodash'
import fastMemoize from 'fast-memoize'
import { Benchmark } from '../benchmarkHelper'
import { memoize } from './memoize'

function monadicPrimitiveFunc(a: number) {
  return a + 1
}

function monadicSerializedFunc(a: string) {
  return a + '1'
}

function variadicFunc(a: number, b: number) {
  return a + b
}

const benchmark = new Benchmark('memoize')

const lodashMonadicPrimitiveFunc = lodash.memoize(monadicPrimitiveFunc)
benchmark.add({
  library: 'lodash',
  input: 'monadic (primitive)',
  func: () => lodashMonadicPrimitiveFunc(1),
})

const fastMemoizeMonadicPrimitiveFunc = fastMemoize(monadicPrimitiveFunc, {
  strategy: fastMemoize.strategies.monadic,
})
benchmark.add({
  library: 'fast-memoize',
  input: 'monadic (primitive)',
  func: () => fastMemoizeMonadicPrimitiveFunc(1),
})

const flockyMonadicPrimitiveFunc = memoize(monadicPrimitiveFunc, { strategy: 'monadic' })
benchmark.add({
  library: 'flocky',
  input: 'monadic (primitive)',
  func: () => flockyMonadicPrimitiveFunc(1),
})

const lodashMonadicSerializedFunc = lodash.memoize(monadicSerializedFunc)
benchmark.add({
  library: 'lodash',
  input: 'monadic (serialized)',
  func: () => lodashMonadicSerializedFunc('1'),
})

const fastMemoizeMonadicSerializedFunc = fastMemoize(monadicSerializedFunc, {
  strategy: fastMemoize.strategies.monadic,
})
benchmark.add({
  library: 'fast-memoize',
  input: 'monadic (serialized)',
  func: () => fastMemoizeMonadicSerializedFunc('1'),
})

const flockyMonadicSerializedFunc = memoize(monadicSerializedFunc, { strategy: 'monadic' })
benchmark.add({
  library: 'flocky',
  input: 'monadic (serialized)',
  func: () => flockyMonadicSerializedFunc('1'),
})

const lodashVariadicFunc = lodash.memoize(variadicFunc, (...args) => JSON.stringify(args))
benchmark.add({
  library: 'lodash',
  input: 'variadic',
  func: () => lodashVariadicFunc(1, 2),
})

const fastMemoizeVariadicFunc = fastMemoize(variadicFunc, {
  strategy: fastMemoize.strategies.variadic,
})
benchmark.add({
  library: 'fast-memoize',
  input: 'variadic',
  func: () => fastMemoizeVariadicFunc(1, 2),
})

const flockyVariadicFunc = memoize(variadicFunc, { strategy: 'variadic' })
benchmark.add({
  library: 'flocky',
  input: 'variadic',
  func: () => flockyVariadicFunc(1, 2),
})

benchmark.run()
