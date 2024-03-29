import { dateNow, mathRandom } from '../testHelpers'
import { identifier } from './identifier'

const UUID_FORMAT = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

describe('identifier', () => {
  beforeEach(() => {
    mathRandom.setup()
    dateNow.setup()
  })

  afterEach(() => {
    mathRandom.reset()
    dateNow.reset()
  })

  test('generates a random identifier', () => {
    expect(identifier()).toEqual('bfc8d57e-b9ab-4245-836e-d1fd99602e30')
  })
})

describe('identifier (fuzzing)', () => {
  const ITERATIONS = 1000

  test('generates only valid UUIDs', () => {
    for (let i = 0; i !== ITERATIONS; i++) {
      const id = identifier()
      expect(id.match(UUID_FORMAT)).toBeTruthy()
    }
  })
})
