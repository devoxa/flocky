import lodash from 'lodash'
import fastMemoize from 'fast-memoize'
import { Benchmark } from '../benchmarkHelper'
import { memoize } from './memoize'

function monadicFunc(a: number) {
  return a + 1
}

function variadicFunc(a: number, b: number) {
  return a + b
}

let benchmark = new Benchmark('memoize')

const lodashMonadicFunc = lodash.memoize(monadicFunc)
benchmark.add({
  library: 'lodash',
  input: 'monadic',
  func: () => lodashMonadicFunc(1),
})

const fastMemoizeMonadicFunc = fastMemoize(monadicFunc, {
  strategy: fastMemoize.strategies.monadic,
})
benchmark.add({
  library: 'fast-memoize',
  input: 'monadic',
  func: () => fastMemoizeMonadicFunc(1),
})

const flockyMonadicFunc = memoize(monadicFunc, { strategy: 'monadic' })
benchmark.add({
  library: 'flocky',
  input: 'monadic',
  func: () => flockyMonadicFunc(1),
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
