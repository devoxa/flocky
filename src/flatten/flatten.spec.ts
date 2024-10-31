import { flatten } from './flatten'

describe('flatten', () => {
  test('flattens the object', () => {
    expect(flatten({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 })

    expect(flatten({ a: { b: 1 } })).toEqual({ 'a.b': 1 })
    expect(flatten({ a: { b: 1, c: 2 } })).toEqual({ 'a.b': 1, 'a.c': 2 })
    expect(flatten({ a: { b: 1, c: 2 }, d: { e: 3 } })).toEqual({ 'a.b': 1, 'a.c': 2, 'd.e': 3 })

    expect(flatten({ a: { b: { c: 1 } } })).toEqual({ 'a.b.c': 1 })
    expect(flatten({ a: { b: { c: 1, d: 2 } } })).toEqual({ 'a.b.c': 1, 'a.b.d': 2 })
    expect(flatten({ a: { b: { c: 1, d: 2 } }, e: { f: { g: 3 } } })).toEqual({
      'a.b.c': 1,
      'a.b.d': 2,
      'e.f.g': 3,
    })

    // Check that the types are correct
    const result = flatten({ a: { b: { c: 1, d: 2 } }, e: { f: { g: 3 } } })
    expect(result['a.b.c'] + 1).toEqual(2)
    expect(result['a.b.d'] + 1).toEqual(3)
    expect(result['e.f.g'] + 1).toEqual(4)
  })
})
