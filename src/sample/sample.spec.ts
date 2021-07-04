import { mathRandom } from '../testHelpers'
import { sample } from './sample'

describe('sample', () => {
  beforeEach(() => {
    mathRandom.setup()
  })

  afterEach(() => {
    mathRandom.reset()
  })

  it('samples primitive arrays', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const element = sample(original)

    expect(original).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(element).toEqual(8)
  })

  it('samples object arrays', () => {
    const original = [{ a: 1 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }]
    const element = sample(original)

    expect(original).toEqual([{ a: 1 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }])
    expect(element).toEqual({ d: 1 })
  })
})

describe('sample (fuzzing)', () => {
  const ITERATIONS = 1000

  it('does not get out of bound elements', () => {
    for (let i = 0; i !== ITERATIONS; i++) {
      const number = sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      expect(number).toBeTruthy()
    }
  })
})
