import hash from './index'

function makeString(length: number): string {
  let text = ''
  for (let i = 0; i < length; i++) {
    text += 'A'
  }
  return text
}

describe('hash', () => {
  it('consistently hashes the input', () => {
    expect(hash('Never gonna give you up')).toEqual('x1bvo9jc')
    expect(hash('Never gonna give you up')).toEqual('x1bvo9jc')
    expect(hash('Never gonna give you up')).toEqual('x1bvo9jc')
  })

  it('can hash any input', () => {
    expect(hash('string')).toEqual('xcmbrgs')
    expect(hash(7)).toEqual('x1fq1y7a')
    expect(hash(true)).toEqual('x1rowxc0')

    expect(hash({ object: true })).toEqual('x1qx0xkp')
    expect(hash(['array'])).toEqual('xr7mzub')
  })

  it('is fast for a lot of data', () => {
    const string = makeString(1024 * 1024) // ~1MB of data

    const start = new Date().getTime()
    const result = hash(string)
    const durationMs = new Date().getTime() - start

    expect(result).toEqual('xhowk3l')
    expect(durationMs).toBeLessThan(30)
  })
})
