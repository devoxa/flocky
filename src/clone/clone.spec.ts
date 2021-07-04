import { clone } from './clone'

describe('clone', () => {
  it('clones primitive types', () => {
    expect(clone('AAA')).toEqual('AAA')
    expect(clone(123)).toEqual(123)
    expect(clone(true)).toEqual(true)
    expect(clone(null)).toEqual(null)

    // Handles undefined
    const x = { a: undefined, b: null }
    expect(clone(x)).toEqual({ b: null })
  })

  it('deep clones objects', () => {
    const original = { a: { b: 1 } }
    const cloned = clone(original)
    cloned.a.b = 2

    expect(original).toEqual({ a: { b: 1 } })
    expect(cloned).toEqual({ a: { b: 2 } })
  })

  it('deep clones arrays', () => {
    const original = [{ a: 1 }, { b: 1 }]
    const cloned = clone(original)
    cloned[0].a = 2

    expect(original).toEqual([{ a: 1 }, { b: 1 }])
    expect(cloned).toEqual([{ a: 2 }, { b: 1 }])
  })
})
