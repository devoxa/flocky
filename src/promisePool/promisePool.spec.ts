import { sleep } from '../sleep/sleep'
import { expectApproximateDuration } from '../testHelpers'
import { promisePool } from './promisePool'

const PROMISE_FUNCTIONS = new Array(9).fill('').map((_, i) => async () => {
  await sleep(100)
  return i
})

describe('promisePool', () => {
  test('runs the promise functions in parallel', async () => {
    const start = new Date()
    const result = await promisePool(PROMISE_FUNCTIONS, 100)
    const end = new Date()

    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expectApproximateDuration(start, end, 100)
  })

  test('runs the promise functions in parallel with a limit', async () => {
    const start = new Date()
    const result = await promisePool(PROMISE_FUNCTIONS, 3)
    const end = new Date()

    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expectApproximateDuration(start, end, 3 * 100)
  })

  test('runs the promise functions in series', async () => {
    const start = new Date()
    const result = await promisePool(PROMISE_FUNCTIONS, 1)
    const end = new Date()

    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expectApproximateDuration(start, end, 9 * 100)
  })

  test('errors when the first promise function errors', async () => {
    const ERRORING_PROMISE_FUNCTIONS = Object.assign([], PROMISE_FUNCTIONS, {
      5: () => Promise.reject(new Error('Something went wrong.')),
    })

    const start = new Date()
    let error
    try {
      await promisePool(ERRORING_PROMISE_FUNCTIONS, 2)
    } catch (err) {
      error = err
    }
    const end = new Date()

    expect(error.message).toEqual('Something went wrong.')
    expectApproximateDuration(start, end, 2 * 100)
  })
})
