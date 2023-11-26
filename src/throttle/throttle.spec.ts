import { sleep } from '../sleep/sleep'
import { throttle } from './throttle'

describe('throttle', () => {
  test('throttles the function call', async () => {
    const func = jest.fn()

    const throttledFunc = throttle(func, 25)
    throttledFunc('a')
    throttledFunc('ab')
    throttledFunc('abc')
    throttledFunc('abcd')

    expect(func.mock.calls).toEqual([['a']])
    await sleep(50)
    expect(func.mock.calls).toEqual([['a'], ['abcd']])

    throttledFunc('abcde')
    throttledFunc('abcdef')

    expect(func.mock.calls).toEqual([['a'], ['abcd'], ['abcde']])
    await sleep(25)
    expect(func.mock.calls).toEqual([['a'], ['abcd'], ['abcde'], ['abcdef']])
  })

  test('has the correct type', async () => {
    const func = (a: number, b: number): number => {
      return a + b
    }

    const throttledFunc = throttle(func, 250)

    // @ts-expect-error The first argument has to be a number
    throttledFunc('a', 2)

    // @ts-expect-error The second argument has to be a number
    throttledFunc(2, 'a')

    // @ts-expect-error The return value is void
    throttledFunc(2, 2)?.concat

    // @ts-expect-error The return value is void
    throttledFunc(2, 2)?.toFixed
  })
})
