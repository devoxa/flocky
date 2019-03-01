import roundTo from './index'

describe('roundTo', () => {
  it('rounds the number to the expected precision', () => {
    // General usage with integers
    expect(roundTo(1, 0)).toEqual(1)
    expect(roundTo(1, 3)).toEqual(1)

    // General usage with floats
    expect(roundTo(0.129, 1)).toEqual(0.1)
    expect(roundTo(0.129, 2)).toEqual(0.13)
    expect(roundTo(0.129, 3)).toEqual(0.129)

    // Edge cases for floating point weirdness
    expect(roundTo(1.005, 2)).toEqual(1.01)
    expect(roundTo(1.005, 0)).toEqual(1)

    // Negative precision
    expect(roundTo(111.1, -2)).toEqual(100)

    // Negative numbers
    expect(roundTo(-3.51, 1)).toEqual(-3.5)
    expect(roundTo(-0.375, 2)).toEqual(-0.38)

    // Edge cases for maximum floating point precision
    expect(roundTo(1e20, 1)).toEqual(1e20)
    expect(roundTo(10000000000000.123, 8)).toEqual(10000000000000.123)
    expect(roundTo(0.37542323423423432432432432432, 8)).toEqual(0.37542323)
  })
})
