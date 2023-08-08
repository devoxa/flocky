import { compact } from './compact'

describe('compact', () => {
  test('compacts numeric arrays', () => {
    const original = [1, false, 2, null, 3, 0, 4, '', 5, undefined]
    const compacted = compact(original)

    expect(original).toEqual([1, false, 2, null, 3, 0, 4, '', 5, undefined])
    expect(compacted).toEqual([1, 2, 3, 4, 5])
  })

  test('compacts string arrays', () => {
    const original = ['a', false, 'b', null, 'c', 0, 'd', '', 'e', undefined]
    const compacted = compact(original)

    expect(original).toEqual(['a', false, 'b', null, 'c', 0, 'd', '', 'e', undefined])
    expect(compacted).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  test('compacts object arrays', () => {
    const original = [
      { a: 1 },
      false,
      { b: 1 },
      null,
      { c: 1 },
      0,
      { d: 1 },
      '',
      { e: 1 },
      undefined,
    ]
    const compacted = compact(original)

    expect(original).toEqual([
      { a: 1 },
      false,
      { b: 1 },
      null,
      { c: 1 },
      0,
      { d: 1 },
      '',
      { e: 1 },
      undefined,
    ])
    expect(compacted).toEqual([{ a: 1 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }])
  })

  test('compacts completely falsy arrays', () => {
    const original = [false, null, 0, NaN, undefined, '']
    const compacted = compact(original)

    expect(original).toEqual([false, null, 0, NaN, undefined, ''])
    expect(compacted).toEqual([])
  })
})
