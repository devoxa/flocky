import { sleep } from '../sleep/sleep'
import { expectApproximateDuration } from '../testHelpers'
import { promiseTimeout } from './promiseTimeout'

async function promiseWithDuration<T>(value: T, duration: number): Promise<T> {
  await sleep(duration)
  return value
}

describe('promiseTimeout', () => {
  it('runs the promise without hitting the timeout', async () => {
    const start = new Date()
    const result = await promiseTimeout(promiseWithDuration({ foo: 'bar' }, 100), 200)
    const end = new Date()

    expect(result).toEqual({ foo: 'bar' })
    expectApproximateDuration(start, end, 100)

    // The return type has this property
    result.foo.toString()

    // @ts-expect-error The return type does not have this property
    result.bar
  })

  it('rejects the promise when hitting the timeout', async () => {
    let error

    const start = new Date()
    try {
      await promiseTimeout(promiseWithDuration('foo', 200), 100)
    } catch (err) {
      error = err
    }
    const end = new Date()

    expect(error.message).toEqual('Promise timed out')
    expectApproximateDuration(start, end, 100)
  })
})
