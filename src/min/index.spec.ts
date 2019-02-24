import min from './index'

describe('min', () => {
  it('calculates the minimum of an array of numbers', () => {
    expect(min([4, 2, 6])).toEqual(2)
    expect(min([9, 4, 3, 7, 79, -60])).toEqual(-60)
    expect(min([])).toEqual(Infinity)
  })
})
