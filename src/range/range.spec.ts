import { range } from './range'

describe('range', () => {
  test('generates a range of numbers', () => {
    expect(range(0, 1)).toEqual([0, 1])
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    expect(range(-4, -1)).toEqual([-4, -3, -2, -1])
    expect(range(-1, -6)).toEqual([-1, -2, -3, -4, -5, -6])
  })

  test('generates a range of numbers with a custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10])
    expect(range(-1, -11, 2)).toEqual([-1, -3, -5, -7, -9, -11])
  })

  test('does not generate an out of bounds range', () => {
    expect(range(0, 0)).toEqual([0])
    expect(range(0, 12, 10)).toEqual([0, 10])
  })
})
