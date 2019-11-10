import { mathRandom } from '../testHelpers'
import { shuffle } from './index'

describe('shuffle', () => {
  beforeEach(() => {
    mathRandom.setup()
  })

  afterEach(() => {
    mathRandom.reset()
  })

  it('shuffles primitive arrays', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const shuffled = shuffle(original)

    expect(original).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(shuffled).toEqual([3, 7, 2, 1, 10, 4, 6, 9, 5, 8])
  })

  it('shuffles object arrays', () => {
    const original = [{ a: 1 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }]
    const shuffled = shuffle(original)

    expect(original).toEqual([{ a: 1 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }])
    expect(shuffled).toEqual([{ a: 1 }, { e: 1 }, { b: 1 }, { c: 1 }, { d: 1 }])
  })
})
