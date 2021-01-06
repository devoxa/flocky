import { debounce } from '.'
import { sleep } from '../sleep'

describe('debounce', () => {
  it('debounces the function call', async () => {
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
})
