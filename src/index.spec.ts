import parseModules from './parseModules'
import _flocky from './index'

// This is here because the "import" is not a global variable for "eval"
const flocky = _flocky

describe('index file', () => {
  it('exports the modules', () => {
    expect(Object.keys(flocky).length).toBeGreaterThanOrEqual(5)
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
