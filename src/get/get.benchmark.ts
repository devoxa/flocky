import lodash from 'lodash'
import { Benchmark } from '../benchmarkHelper'
import { get } from './get'

const OBJECT = { foo: { bar: { herp: 123 } } }

const benchmark = new Benchmark('get')

benchmark.add({
  library: 'lodash',
  input: 'array path',
  func: () => lodash.get(OBJECT, ['foo', 'bar', 'herp' + Math.random()]),
})

benchmark.add({
  library: 'lodash',
  input: 'string path',
  func: () => lodash.get(OBJECT, 'foo.bar.herp' + Math.random()),
})

benchmark.add({
  library: 'flocky',
  input: 'array path',
  func: () => get(OBJECT, ['foo', 'bar', 'herp' + Math.random()]),
})

benchmark.add({
  library: 'flocky',
  input: 'string path',
  func: () => get(OBJECT, 'foo.bar.herp' + Math.random()),
})

benchmark.run()
