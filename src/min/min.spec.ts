import { min } from './min'

describe('min', () => {
  test('calculates the minimum of an array of numbers', () => {
    expect(min([4, 2, 6])).toEqual(2)
    expect(min([9, 4, 3, 7, 79, -60])).toEqual(-60)
    expect(min([])).toEqual(Infinity)
  })

  test('does not mutate the input', () => {
    const input = [1, 2, 3]
    min(input)
    expect(input).toEqual([1, 2, 3])
  })
})
