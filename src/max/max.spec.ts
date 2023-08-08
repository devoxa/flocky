import { max } from './max'

describe('max', () => {
  test('calculates the maximum of an array of numbers', () => {
    expect(max([4, 2, 6])).toEqual(6)
    expect(max([9, 4, 3, 7, 79, -60])).toEqual(79)
    expect(max([])).toEqual(-Infinity)
  })

  test('does not mutate the input', () => {
    const input = [1, 2, 3]
    max(input)
    expect(input).toEqual([1, 2, 3])
  })
})
