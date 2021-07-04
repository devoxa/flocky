import lodash from 'lodash'
import { Benchmark } from '../benchmarkHelper'
import { unique } from './unique'

function generateArrayOfSize(size: number) {
  const array: Array<number> = []

  for (let i = 0; i !== size; i++) {
    array.push(Math.random())
  }

  return array
}

const LARGE_ARRAY = generateArrayOfSize(10000)
const SMALL_ARRAY = generateArrayOfSize(100)
console.log('Setup finished')

let benchmark = new Benchmark('unique')

benchmark.add({
  library: 'es6 filter',
  input: 'large array',
  func: () => LARGE_ARRAY.filter((x, i, self) => self.indexOf(x) === i),
})

benchmark.add({
  library: 'es6 filter',
  input: 'small array',
  func: () => SMALL_ARRAY.filter((x, i, self) => self.indexOf(x) === i),
})

benchmark.add({
  library: 'lodash',
  input: 'large array',
  func: () => lodash.uniq(LARGE_ARRAY),
})

benchmark.add({
  library: 'lodash',
  input: 'small array',
  func: () => lodash.uniq(SMALL_ARRAY),
})

benchmark.add({
  library: 'flocky',
  input: 'large array',
  func: () => unique(LARGE_ARRAY),
})

benchmark.add({
  library: 'flocky',
  input: 'small array',
  func: () => unique(SMALL_ARRAY),
})

benchmark.run()
