import { hash } from './hash'

describe('hash', () => {
  test('consistently hashes the input', () => {
    expect(hash('Never gonna give you up')).toEqual('x1bvo9jc')
    expect(hash('Never gonna give you up')).toEqual('x1bvo9jc')
    expect(hash('Never gonna give you up')).toEqual('x1bvo9jc')
  })

  test('can hash any input type', () => {
    expect(hash('string')).toEqual('xcmbrgs')
    expect(hash(7)).toEqual('x1fq1y7a')
    expect(hash(true)).toEqual('x1rowxc0')

    expect(hash({ object: true })).toEqual('x1qx0xkp')
    expect(hash(['array'])).toEqual('xr7mzub')
  })
})
