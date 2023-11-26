import { sleep } from '../sleep/sleep'
import { memoize } from './memoize'

type NumberObject = { n: number }

describe('memoize', () => {
  test('memoizes function calls with no arguments', () => {
    const calls: Array<[]> = []
    const func = () => {
      calls.push([])
      return 1
    }

    const memoizedFunc = memoize(func)

    expect(memoizedFunc()).toEqual(1)
    expect(memoizedFunc()).toEqual(1)
    expect(calls).toEqual([[]])
  })

  test('memoizes function calls with a single primitive argument', () => {
    const calls: Array<Array<number>> = []
    const func = (x: number) => {
      calls.push([x])
      return x + 1
    }

    const memoizedFunc = memoize(func)

    expect(memoizedFunc(1)).toEqual(2)
    expect(memoizedFunc(1)).toEqual(2)
    expect(memoizedFunc(2)).toEqual(3)
    expect(memoizedFunc(1)).toEqual(2)
    expect(calls).toEqual([[1], [2]])
  })

  test('memoizes function calls with a single non-primitive argument', () => {
    const calls: Array<Array<NumberObject>> = []
    const func = (x: NumberObject) => {
      calls.push([x])
      return x.n + 1
    }

    const memoizedFunc = memoize(func)

    expect(memoizedFunc({ n: 1 })).toEqual(2)
    expect(memoizedFunc({ n: 1 })).toEqual(2)
    expect(memoizedFunc({ n: 2 })).toEqual(3)
    expect(memoizedFunc({ n: 1 })).toEqual(2)
    expect(calls).toEqual([[{ n: 1 }], [{ n: 2 }]])
  })

  test('memoizes function calls with multiple primitive arguments', () => {
    const calls: Array<Array<number>> = []
    const func = (a: number, b: number) => {
      calls.push([a, b])
      return a + b
    }

    const memoizedFunc = memoize(func)

    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(3, 4)).toEqual(7)
    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(1, 4)).toEqual(5)
    expect(calls).toEqual([
      [1, 2],
      [3, 4],
      [1, 4],
    ])
  })

  test('memoizes function calls with multiple non-primitive arguments', () => {
    const calls: Array<Array<NumberObject>> = []
    const func = (a: NumberObject, b: NumberObject) => {
      calls.push([a, b])
      return a.n + b.n
    }

    const memoizedFunc = memoize(func)

    expect(memoizedFunc({ n: 1 }, { n: 2 })).toEqual(3)
    expect(memoizedFunc({ n: 1 }, { n: 2 })).toEqual(3)
    expect(memoizedFunc({ n: 3 }, { n: 4 })).toEqual(7)
    expect(memoizedFunc({ n: 1 }, { n: 2 })).toEqual(3)
    expect(memoizedFunc({ n: 1 }, { n: 4 })).toEqual(5)
    expect(calls).toEqual([
      [{ n: 1 }, { n: 2 }],
      [{ n: 3 }, { n: 4 }],
      [{ n: 1 }, { n: 4 }],
    ])
  })

  test('memoizes function calls with spread primitive arguments', () => {
    const calls: Array<Array<number>> = []
    const func = (multiplier: number, ...numbers: Array<number>) => {
      calls.push([multiplier, ...numbers])
      return numbers.map((x) => multiplier * x)
    }

    const memoizedFunc = memoize(func, {
      strategy: 'variadic',
    })

    expect(memoizedFunc(2, 1, 2, 3)).toEqual([2, 4, 6])
    expect(memoizedFunc(3, 4, 5, 6)).toEqual([12, 15, 18])
    expect(memoizedFunc(2, 1, 2, 3)).toEqual([2, 4, 6])
    expect(calls).toEqual([
      [2, 1, 2, 3],
      [3, 4, 5, 6],
    ])
  })

  test('memoizes function calls with spread non-primitive arguments', () => {
    const calls: Array<Array<NumberObject>> = []
    const func = (multiplier: NumberObject, ...numbers: Array<NumberObject>) => {
      calls.push([multiplier, ...numbers])
      return numbers.map((x) => multiplier.n * x.n)
    }

    const memoizedFunc = memoize(func, {
      strategy: 'variadic',
    })

    expect(memoizedFunc({ n: 2 }, { n: 1 }, { n: 2 })).toEqual([2, 4])
    expect(memoizedFunc({ n: 3 }, { n: 4 }, { n: 5 })).toEqual([12, 15])
    expect(memoizedFunc({ n: 2 }, { n: 1 }, { n: 2 })).toEqual([2, 4])
    expect(calls).toEqual([
      [{ n: 2 }, { n: 1 }, { n: 2 }],
      [{ n: 3 }, { n: 4 }, { n: 5 }],
    ])
  })

  test('passes arguments as their original primitive', () => {
    const func = (x: unknown) => (typeof x === 'object' && x ? x.constructor.name : typeof x)

    const memoizedFunc = memoize(func)

    expect(memoizedFunc(1)).toEqual('number')
    expect(memoizedFunc('2')).toEqual('string')
    expect(memoizedFunc({ n: 3 })).toEqual('Object')
  })

  test('can define a custom strategy (monadic)', () => {
    const calls: Array<Array<number>> = []
    const func = (a: number, b: number) => {
      calls.push([a, b])
      return a
    }

    const memoizedFunc = memoize(func, {
      strategy: 'monadic',
    })

    expect(memoizedFunc(1, 2)).toEqual(1)
    expect(memoizedFunc(1, 2)).toEqual(1)
    expect(memoizedFunc(1, 3)).toEqual(1)
    expect(memoizedFunc(3, 4)).toEqual(3)
    expect(memoizedFunc(1, 2)).toEqual(1)
    expect(memoizedFunc(1, 4)).toEqual(1)
    expect(calls).toEqual([
      [1, undefined],
      [3, undefined],
    ])
  })

  test('can define a custom strategy (variadic)', () => {
    const calls: Array<Array<number>> = []
    const func = (x: number) => {
      calls.push([x])
      return x + 1
    }

    const memoizedFunc = memoize(func, {
      strategy: 'variadic',
    })

    expect(memoizedFunc(1)).toEqual(2)
    expect(memoizedFunc(1)).toEqual(2)
    expect(memoizedFunc(2)).toEqual(3)
    expect(memoizedFunc(1)).toEqual(2)
    expect(calls).toEqual([[1], [2]])
  })

  test('can define a custom serializer', () => {
    let serializerCalls = 0
    function serializer(data: unknown) {
      serializerCalls++
      return '__' + JSON.stringify(data) + '__'
    }

    const func = (a: number, b: number) => {
      return a + b
    }

    const memoizedFunc = memoize(func, { serializer })

    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(3, 4)).toEqual(7)
    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(1, 4)).toEqual(5)
    expect(serializerCalls).toEqual(5)
  })

  test('memoizes function calls that return promises', async () => {
    let calls = 0
    const func = async () => {
      calls++
      await sleep(10)
      return 'A'
    }

    const memoizedFunc = memoize(func)

    const a = memoizedFunc()
    expect(a).toBeInstanceOf(Promise)
    const b = memoizedFunc()
    expect(b).toBeInstanceOf(Promise)
    expect(calls).toEqual(1)

    expect(await a).toEqual('A')
    expect(await b).toEqual('A')
    expect(calls).toEqual(1)

    const c = memoizedFunc()
    expect(await c).toEqual('A')
    expect(calls).toEqual(1)
  })

  test('memoizes function calls with a maximum TTL', async () => {
    const calls: Array<Array<number>> = []
    const func = (a: number, b: number) => {
      calls.push([a, b])
      return a + b
    }

    const memoizedFunc = memoize(func, {
      ttl: 10,
    })

    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(memoizedFunc(3, 4)).toEqual(7)
    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(calls).toEqual([
      [1, 2],
      [3, 4],
    ])

    await sleep(20)
    expect(memoizedFunc(1, 2)).toEqual(3)
    expect(calls).toEqual([
      [1, 2],
      [3, 4],
      [1, 2],
    ])
  })

  test('has the correct type', async () => {
    const func = (a: number, b: number): number => {
      return a + b
    }

    const memoizedFunc = memoize(func)

    // @ts-expect-error The first argument has to be a number
    memoizedFunc('a', 2)

    // @ts-expect-error The second argument has to be a number
    memoizedFunc(2, 'a')

    // @ts-expect-error The return value is a number
    memoizedFunc(2, 2).concat

    // This one is okay
    memoizedFunc(2, 2).toFixed(2)
  })
})
