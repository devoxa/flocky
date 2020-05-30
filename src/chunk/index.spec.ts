import { chunk } from './index'

describe('chunk', () => {
  it('splits an array of numbers into chunks', () => {
    const chunks = chunk([1, 2, 3, 4, 5, 6, 7], 3)
    expect(chunks).toEqual([[1, 2, 3], [4, 5, 6], [7]])
  })

  it('splits an array of strings into chunks', () => {
    expect(chunk(['1', '2', '3', '4', '5', '6', '7'], 2)).toEqual([
      ['1', '2'],
      ['3', '4'],
      ['5', '6'],
      ['7'],
    ])
  })

  it('splits an array of objects into chunks', () => {
    expect(
      chunk(
        [
          { a: '1' },
          { a: '2' },
          { a: '3' },
          { a: '4' },
          { a: '5' },
          { a: '6' },
          { a: '7' },
        ],
        4
      )
    ).toEqual([
      [{ a: '1' }, { a: '2' }, { a: '3' }, { a: '4' }],
      [{ a: '5' }, { a: '6' }, { a: '7' }],
    ])
  })

  it('does not mutate the input', () => {
    const input = [1, 2, 3]
    chunk(input, 1)
    expect(input).toEqual([1, 2, 3])
  })
})
