import { omit } from './omit'

describe('omit', () => {
  it('omits the specified keys of the object', () => {
    const original = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const omitted = omit(original, ['a', 'b', 'd'])

    expect(original).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    expect(omitted).toEqual({ c: 3, e: 5 })
  })
})
