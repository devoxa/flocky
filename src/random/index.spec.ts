import random from './index'
import { mathRandom } from '../testHelpers'

describe('random', () => {
  beforeEach(() => {
    mathRandom.setup()
  })

  afterEach(() => {
    mathRandom.reset()
  })

  it('generates a random integer', () => {
    expect(random(0, 10)).toEqual(8)
  })

  it('generates a random float', () => {
    expect(random(0, 10, true)).toEqual(7.341312319841373)
    expect(random(3.5, 4.5)).toEqual(4.0153569814278525)
  })
})

describe('random (fuzzing)', () => {
  const ITERATIONS = 1000

  it('generates valid integers', () => {
    for (let i = 0; i !== ITERATIONS; i++) {
      const number = random(2, 10)
      expect(number >= 2 && number <= 10).toBeTruthy()
    }
  })

  it('generates valid floats', () => {
    for (let i = 0; i !== ITERATIONS; i++) {
      const number = random(2.5, 5.75)
      expect(number >= 2.5 && number <= 5.75).toBeTruthy()
    }
  })

  it('generates valid integers with minimum and maximum bounds', () => {
    for (let i = 0; i !== ITERATIONS; i++) {
      const number = random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

      expect(Number.isNaN(number)).toBeFalsy()
      expect(number >= Number.MIN_SAFE_INTEGER && number <= Number.MAX_SAFE_INTEGER).toBeTruthy()
    }
  })
})
