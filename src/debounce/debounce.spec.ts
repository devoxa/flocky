import { sleep } from '../sleep/sleep'
import { debounce } from './debounce'

describe('debounce', () => {
  test('debounces the function call', async () => {
    const func = jest.fn()

    const debouncedFunc = debounce(func, 25)
    debouncedFunc('a')
    debouncedFunc('ab')
    debouncedFunc('abc')
    debouncedFunc('abcd')

    expect(func.mock.calls).toEqual([])

    await sleep(25)
    debouncedFunc('abcde')
    await sleep(25)

    expect(func.mock.calls).toEqual([['abcd'], ['abcde']])
  })

  test('has the correct type', async () => {
    const func = (a: number, b: number): number => {
      return a + b
    }

    const debouncedFunc = debounce(func, 250)

    // @ts-expect-error The first argument has to be a number
    debouncedFunc('a', 2)

    // @ts-expect-error The second argument has to be a number
    debouncedFunc(2, 'a')

    // @ts-expect-error The return value is void
    debouncedFunc(2, 2)?.concat

    // @ts-expect-error The return value is void
    debouncedFunc(2, 2)?.toFixed
  })
})
