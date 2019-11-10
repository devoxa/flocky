import { average } from './index'

describe('average', () => {
  it('calculates the average of an array of numbers', () => {
    expect(average([1, 4, 2, 0])).toEqual(1.75)
    expect(average([9, 4, 3, 7, 79, -60])).toEqual(7)
    expect(average([])).toEqual(NaN)
  })

  it('does not mutate the input', () => {
    const input = [1, 2, 3]
    average(input)
    expect(input).toEqual([1, 2, 3])
  })
})
