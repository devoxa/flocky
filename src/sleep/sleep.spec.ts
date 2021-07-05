import { expectApproximateDuration } from '../testHelpers'
import { sleep } from './sleep'

describe('sleep', () => {
  it('waits for the specified time', async () => {
    const start = new Date()
    await sleep(100)
    const end = new Date()

    expectApproximateDuration(start, end, 100)
  })
})
