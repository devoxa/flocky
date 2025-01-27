import { mathRandom } from '../testHelpers'
import { random } from './random'

describe('random', () => {
  beforeEach(() => {
    mathRandom.setup()
  })

  afterEach(() => {
    mathRandom.reset()
  })

  test('generates a random integer', () => {
    expect(random(0, 10)).toEqual(8)
  })

  test('generates a random float', () => {
    expect(random(0, 10, true)).toEqual(7.341312319841373)
    expect(random(3.5, 4.5)).toEqual(4.0153569814278525)
  })
})

describe('random (fuzzing)', () => {
  const ITERATIONS = 1000

  test('generates valid integers', () => {
    for (let i = 0; i !== ITERATIONS; i++) {
      const number = random(2, 10)
      expect(number >= 2 && number <= 10).toBeTruthy()
      expect(number % 1 === 0).toBeTruthy()
    }
  })

  test('generates valid floats', () => {
    for (let i = 0; i !== ITERATIONS; i++) {
      const number = random(2.5, 5.75)
      expect(number >= 2.5 && number <= 5.75).toBeTruthy()
    }
  })

  test('generates valid integers with minimum and maximum bounds', () => {
    const isInBounds = (x: number): boolean =>
      x >= Number.MIN_SAFE_INTEGER && x <= Number.MAX_SAFE_INTEGER

    for (let i = 0; i !== ITERATIONS; i++) {
      const number = random(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

      expect(Number.isNaN(number)).toBeFalsy()
      expect(isInBounds(number)).toBeTruthy()
    }
  })
})
