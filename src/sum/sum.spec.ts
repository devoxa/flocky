import sum from './sum'

describe('sum', () => {
  it('calculates the sum of an array of numbers', () => {
    expect(sum([1, 4, 2, 0])).toEqual(7)
    expect(sum([9, 4, 3, 7, 79, -60])).toEqual(42)
    expect(sum([])).toEqual(0)
  })
})
