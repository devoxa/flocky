import randomString from './index'
import { mathRandom } from '../testHelpers'

describe('randomString', () => {
  beforeEach(() => {
    mathRandom.setup()
  })

  afterEach(() => {
    mathRandom.reset()
  })

  it('generates a random string', () => {
    expect(randomString(5)).toEqual('tfl0g')
    expect(randomString(10)).toEqual('9JmILmsJRU')
    expect(randomString(3)).toEqual('vPY')
  })
})
