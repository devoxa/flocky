import { toMap } from './toMap'

describe('toMap', () => {
  test('generates a map with no target', () => {
    const input = [
      { id: 1, name: 'Anna', age: 64 },
      { id: 2, name: 'Bertha', age: 57 },
      {
        id: 3,
        name: 'Chris',
        age: 19,
        alignment: { evil: 3, neutral: 1, good: 0 },
      },
    ]

    expect(toMap(input, 'id')).toEqual({
      1: { id: 1, name: 'Anna', age: 64 },
      2: { id: 2, name: 'Bertha', age: 57 },
      3: {
        id: 3,
        name: 'Chris',
        age: 19,
        alignment: { evil: 3, neutral: 1, good: 0 },
      },
    })

    expect(toMap(input, 'name')).toEqual({
      Anna: { id: 1, name: 'Anna', age: 64 },
      Bertha: { id: 2, name: 'Bertha', age: 57 },
      Chris: {
        id: 3,
        name: 'Chris',
        age: 19,
        alignment: { evil: 3, neutral: 1, good: 0 },
      },
    })

    expect(toMap(input, 'age')).toEqual({
      64: { id: 1, name: 'Anna', age: 64 },
      57: { id: 2, name: 'Bertha', age: 57 },
      19: {
        id: 3,
        name: 'Chris',
        age: 19,
        alignment: { evil: 3, neutral: 1, good: 0 },
      },
    })
  })

  test('generates a map with a target', () => {
    const input = [
      { id: 1, name: 'Anna', age: 64 },
      { id: 2, name: 'Bertha', age: 57 },
      { id: 3, name: 'Chris', age: 19 },
    ]

    expect(toMap(input, 'id', 'age')).toEqual({
      1: 64,
      2: 57,
      3: 19,
    })

    expect(toMap(input, 'name', 'name')).toEqual({
      Anna: 'Anna',
      Bertha: 'Bertha',
      Chris: 'Chris',
    })

    expect(toMap(input, 'age', 'id')).toEqual({
      64: 1,
      57: 2,
      19: 3,
    })
  })

  test('filters elements if the key does not exist', () => {
    const input = [
      { id: 1, name: 'Anna', age: 64 },
      { id: 2, name: 'Bertha', age: 57 },
      { name: 'Chris Clone', age: 80 },
      { id: 3, name: 'Chris', age: 19 },
    ]

    expect(toMap(input, 'id', 'age')).toEqual({
      1: 64,
      2: 57,
      3: 19,
    })
  })

  test('does not mutate the input', () => {
    const input = [
      { id: 1, name: 'Anna' },
      { id: 2, name: 'Bertha' },
      { id: 3, name: 'Chris' },
    ]

    toMap(input, 'id')
    expect(input).toEqual([
      { id: 1, name: 'Anna' },
      { id: 2, name: 'Bertha' },
      { id: 3, name: 'Chris' },
    ])
  })
})
