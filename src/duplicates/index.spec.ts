import { duplicates } from './index'

describe('duplicates', () => {
  it('filters the duplicate occurrences of an array of numbers', () => {
    expect(duplicates([1, 4, 2, 0])).toEqual([])
    expect(duplicates([1, 1, 4, 2, 0, 2, 0])).toEqual([1, 2, 0])
  })

  it('filters the duplicate occurrences of an array of strings', () => {
    expect(duplicates(['foo', 'bar', 'foo', 'foobar', 'foo', 'foo'])).toEqual([
      'foo',
      'foo',
      'foo',
    ])
  })

  it('filters the duplicate occurrences of an array of objects with an identity function', () => {
    const input = [
      { id: 1, name: 'Foo1' },
      { id: 2, name: 'Foo2' },
      { id: 1, name: 'Foo3' },
      { id: 3, name: 'Foo4' },
      { id: 2, name: 'Foo5' },
    ]

    const expected = [
      { id: 1, name: 'Foo3' },
      { id: 2, name: 'Foo5' },
    ]

    expect(duplicates(input, (element) => element.id)).toEqual(expected)
  })

  it('does not mutate the input', () => {
    const input = [1, 2, 3, 1]
    duplicates(input)
    expect(input).toEqual([1, 2, 3, 1])
  })
})
