import { Benchmark } from '../benchmarkHelper'
import { omit } from './omit'
import { randomString } from '../randomString/randomString'

const benchmark = new Benchmark('omit')

const omitKeys: Array<string> = []
for (let i = 0; i !== 55; i++) {
  omitKeys.push(randomString(10))
}

benchmark.add({
  library: 'flocky',
  input: '5 properties / 3 omitted',
  func: () => omit({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['a', 'b', 'd']),
})

benchmark.add({
  library: 'flocky',
  input: '26 properties / 3 omitted',
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

    return omit(object, ['a', 'b', 'd'])
  },
})

benchmark.add({
  library: 'flocky',
  input: '10 properties / 55 omitted',
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
    }

    return omit(object, omitKeys as Array<keyof typeof object>)
  },
})

benchmark.run()
