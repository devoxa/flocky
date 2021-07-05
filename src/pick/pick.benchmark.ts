import { Benchmark } from '../benchmarkHelper'
import { pick } from './pick'

const benchmark = new Benchmark('pick')

benchmark.add({
  library: 'flocky',
  input: '5 properties / 3 picked',
  func: () => pick({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['a', 'b', 'd']),
})

benchmark.add({
  library: 'flocky',
  input: '26 properties / 3 picked',
  func: () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
      q: 17,
      r: 18,
      s: 19,
      t: 20,
      u: 21,
      v: 22,
      w: 23,
      x: 24,
      y: 25,
      z: 26,
    }

    return pick(object, ['a', 'b', 'd'])
  },
})

benchmark.run()
