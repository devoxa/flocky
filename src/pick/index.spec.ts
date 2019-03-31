import pick from './index'

describe('pick', () => {
  it('picks the specified keys of the object', () => {
    const original = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const picked = pick(original, ['a', 'b', 'd'])

    expect(original).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    expect(picked).toEqual({ a: 1, b: 2, d: 4 })
  })
})
