import { sleep } from './index'

describe('sleep', () => {
  it('waits for the specified time', async () => {
    const start = new Date()
    await sleep(100)
    expect(new Date().getTime() - start.getTime()).toBeGreaterThanOrEqual(95)
  })
})
