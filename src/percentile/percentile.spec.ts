import { percentile } from './percentile'

describe('percentile', () => {
  test('calculates the percentile of an array of numbers', () => {
    expect(percentile([1, 4, 2, 4, 0], 0.5)).toEqual(2)

    const values = [90, 85, 65, 72, 82, 96, 70, 79, 68, 84]
    expect(percentile(values, 1)).toEqual(96)
    expect(percentile(values, 0.95)).toEqual(93.3)
    expect(percentile(values, 0.9)).toEqual(90.6)
    expect(percentile(values, 0.8)).toEqual(86)
    expect(percentile(values, 0.75)).toEqual(84.75)
    expect(percentile(values, 0.7)).toEqual(84.3)
    expect(percentile(values, 0.6)).toEqual(82.8)
    expect(percentile(values, 0.5)).toEqual(80.5)
    expect(percentile(values, 0.25)).toEqual(70.5)
    expect(percentile(values, 0)).toEqual(65)

    expect(percentile([0], 0.5)).toEqual(0)
    expect(percentile([], 0.5)).toEqual(NaN)
  })

  test('does not mutate the input', () => {
    const input = [3, 1, 2, 3]
    percentile(input, 0.5)
    expect(input).toEqual([3, 1, 2, 3])
  })
})
