import parseModules from './parseModules'
import flocky from './index'

const _ = flocky

describe('index file', () => {
  it('exports the modules', () => {
    expect(Object.keys(_)).toEqual(['sum'])
  })
})

describe('documentation examples', () => {
  const modules = parseModules()

  modules.forEach((module) => {
    const { name, examples } = module

    describe(name, () => {
      examples.forEach((example, index: number) => {
        it(`Example #${index + 1}`, () => {
          expect(eval(example.code)).toEqual(example.expected)
        })
      })
    })
  })
})
