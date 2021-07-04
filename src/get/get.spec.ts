import { get } from './get'

describe('get', () => {
  it('should work with the path of an object', () => {
    let object = { foo: { bar: { herp: 123, derp: 0 } } }
    expect(get(object, 'foo.bar.herp')).toEqual(123)
    expect(get(object, ['foo', 'bar', 'herp'])).toEqual(123)
    expect(get(object, 'foo.bar')).toEqual({ herp: 123, derp: 0 })
    expect(get(object, 'foo[bar]')).toEqual({ herp: 123, derp: 0 })
    expect(get(object, 'foo[bar[herp]]')).toEqual(123)
    expect(get(object, 'foo.bar.derp')).toEqual(0)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: { herp: 123, derp: 0 } } })
  })

  it('should return `undefined` if the path of an object does not exist', () => {
    let object = { foo: { bar: { herp: 123 } } }
    expect(get(object, 'foo.sup.flerp')).toEqual(undefined)
    expect(get(object, 'foo.sup.flerp.derp.merp')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: { herp: 123 } } })
  })

  it('should return `undefined` if part of an path of an object is falsy', () => {
    let object = { foo: null }
    expect(get(object, 'foo')).toEqual(null)
    expect(get(object, 'foo.bar')).toEqual(undefined)
    expect(get(object, 'bar')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: null })

    let object2 = { foo: false }
    expect(get(object2, 'foo')).toEqual(false)
    expect(get(object2, 'foo.bar')).toEqual(undefined)
    expect(get(object2, 'bar')).toEqual(undefined)

    // Does not mutate input
    expect(object2).toEqual({ foo: false })
  })

  it('should return `undefined` if part of an path of an object is not an object', () => {
    let object = { foo: 'herp?' }
    expect(get(object, 'foo')).toEqual('herp?')
    expect(get(object, 'foo.bar')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: 'herp?' })
  })

  it('should return the default if the path of an object does not exist', () => {
    let object = { foo: { bar: { herp: 123 } } }
    expect(get(object, 'foo.sup.flerp', 'the default')).toEqual('the default')

    let object2 = { foo: { bar: { herp: null } } }
    expect(get(object2, 'foo.bar.herp.derp', 'default')).toEqual('default')
    expect(get(object2, 'foo.bar.herp', null)).toEqual(null)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: { herp: 123 } } })
  })

  it('should work with the path of array elements', () => {
    let object = { foo: { bar: ['hi', { herp: 123 }] } }
    expect(get(object, 'foo.bar[1].herp')).toEqual(123)
    expect(get(object, 'foo.bar.[1].herp')).toEqual(123)
    expect(get(object, ['foo', 'bar', '1', 'herp'])).toEqual(123)
    expect(get(object, ['foo', 'bar', 1, 'herp'])).toEqual(123)
    expect(get(object, 'foo.bar.1.herp')).toEqual(123)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: ['hi', { herp: 123 }] } })
  })

  it('should work at the start of a path of array elements', () => {
    let object = [{ foo: { bar: ['hi', { herp: 123 }] } }]
    expect(get(object, '[0].foo.bar[1].herp')).toEqual(123)
    expect(get(object, '[0].foo.bar.1.herp')).toEqual(123)
    expect(get(object, '0.foo.bar[1].herp')).toEqual(123)
    expect(get(object, '0.foo.bar.1.herp')).toEqual(123)

    // Does not mutate input
    expect(object).toEqual([{ foo: { bar: ['hi', { herp: 123 }] } }])
  })

  it('should return `undefined` if the path of array elements does not exist', () => {
    let object = { foo: { bar: [{ herp: 123 }] } }
    expect(get(object, 'foo.bar[1].herp')).toEqual(undefined)
    expect(get(object, 'foo.bar.1.herp')).toEqual(undefined)
    expect(get(object, 'foo.sup[0].herp')).toEqual(undefined)
    expect(get(object, 'foo.sup.0.herp')).toEqual(undefined)
    expect(get(object, 'foo.bar[0].flerp')).toEqual(undefined)
    expect(get(object, 'foo.bar.0.flerp')).toEqual(undefined)

    // Does not mutate input
    expect(object).toEqual({ foo: { bar: [{ herp: 123 }] } })
  })

  it('should return the default if the path of array elements does not exist', () => {
    let object = { foo: { bar: [{ herp: 123 }] } }
    expect(get(object, 'foo.bar[1].herp', 'the default')).toEqual('the default')
    expect(get(object, 'foo.bar.1.herp', 'the default')).toEqual('the default')
    expect(get(object, 'foo.sup[0].herp', 'the default')).toEqual('the default')
    expect(get(object, 'foo.sup.0.herp', 'the default')).toEqual('the default')
    expect(get(object, 'foo.bar[0].flerp', 'default')).toEqual('default')
    expect(get(object, 'foo.bar.0.flerp', 'the default')).toEqual('the default')
    expect(object).toEqual({ foo: { bar: [{ herp: 123 }] } })
  })

  it('should return `undefined` if object does not exist', () => {
    expect(get(null, 'foo.bar')).toEqual(undefined)
    expect(get(undefined, 'foo.bar')).toEqual(undefined)
  })

  it('should return `undefined` if object is not an object', () => {
    // @ts-ignore Ignore the type check for the first argument and test this,
    // because this misuse can happen very easily in JavaScript land
    expect(get('wat', 'foo.bar')).toEqual(undefined)
  })

  it('should return `undefined` if the path is malformed', () => {
    let object = { foo: { bar: [{ herp: 123 }] } }
    expect(get(object, 'foo..')).toEqual(undefined)
    expect(get(object, 'foo.[].bar')).toEqual(undefined)
    expect(get(object, 'foo..bar')).toEqual(undefined)
    expect(get(object, '.foo.bar')).toEqual(undefined)
    expect(get(object, 'foo......[2][1][0].bar')).toEqual(undefined)
    expect(get(object, 'foo......[[1][0].bar')).toEqual(undefined)
    expect(get(object, 'foo......[[1][0].bar')).toEqual(undefined)
  })
})
