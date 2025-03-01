import { clamp } from './clamp'

describe('clamp', () => {
  test('clamps a value between a minimum and maximum range (inside range)', () => {
    expect(clamp(0, 0, 5)).toEqual(0)
    expect(clamp(1, 0, 5)).toEqual(1)
    expect(clamp(3, 0, 5)).toEqual(3)
    expect(clamp(5, 0, 5)).toEqual(5)
  })

  test('clamps a value between a minimum and maximum range (below min)', () => {
    expect(clamp(-0.1, 0, 5)).toEqual(0)
    expect(clamp(-1, 0, 5)).toEqual(0)
    expect(clamp(-10, 0, 5)).toEqual(0)
  })

  test('clamps a value between a minimum and maximum range (above max)', () => {
    expect(clamp(5.1, 0, 5)).toEqual(5)
    expect(clamp(6, 0, 5)).toEqual(5)
    expect(clamp(10, 0, 5)).toEqual(5)
  })

  test('handles very large and small numbers', () => {
    expect(clamp(Number.MAX_SAFE_INTEGER, 0, 100)).toEqual(100)
    expect(clamp(Number.MIN_SAFE_INTEGER, -100, 0)).toEqual(-100)
    expect(clamp(0, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toEqual(0)
  })

  test('handles cases where min equals max', () => {
    expect(clamp(0, 5, 5)).toEqual(5)
    expect(clamp(10, 5, 5)).toEqual(5)
    expect(clamp(-10, 5, 5)).toEqual(5)
  })

  test('handles negative ranges correctly', () => {
    expect(clamp(-3, -5, -1)).toEqual(-3)
    expect(clamp(0, -5, -1)).toEqual(-1)
    expect(clamp(-10, -5, -1)).toEqual(-5)
  })

  test('handles decimal numbers correctly', () => {
    expect(clamp(1.5, 1, 2)).toEqual(1.5)
    expect(clamp(0.5, 1, 2)).toEqual(1)
    expect(clamp(2.5, 1, 2)).toEqual(2)
    expect(clamp(1.5, 1.1, 1.9)).toEqual(1.5)
  })

  test('handles invalid input where min is greater than max', () => {
    expect(clamp(3, 5, 0)).toEqual(0)
    expect(clamp(3, 10, 5)).toEqual(5)
    expect(clamp(-1, 2, -2)).toEqual(-2)
  })
})
