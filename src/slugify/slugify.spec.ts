import { slugify } from './slugify'

describe('slugify', () => {
  test('generates correct slugs', () => {
    expect(slugify('Hi There')).toEqual('hi-there')
    expect(slugify('Hi-- There')).toEqual('hi-there')
    expect(slugify('   Hi 123_      There   ')).toEqual('hi-123-there')
    expect(slugify('   #;123-0sdg--+++asofinasg.d/f23XXX£948//   ')).toEqual(
      '123-0sdg-asofinasg-d-f23xxx-948'
    )
    expect(slugify('unicode ♥ is ☢')).toEqual('unicode-is')
    expect(slugify('---trim---')).toEqual('trim')
  })
})
