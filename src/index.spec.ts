import _flocky from './index'
import { parseModules } from './parseModules'
import { dateNow, mathRandom } from './testHelpers'

// This is here because the "import" is not a global variable for "eval"
const flocky = _flocky

describe('index file', () => {
  it('exports the modules', () => {
    expect(Object.keys(flocky).length).toBeGreaterThanOrEqual(5)
  })
})

describe('documentation examples', () => {
  beforeEach(() => {
    mathRandom.setup()
    dateNow.setup()
  })

  afterEach(() => {
    mathRandom.reset()
    dateNow.reset()
  })

  const modules = parseModules()
  modules.forEach((module) => {
    const { name, examples } = module

    describe(name, () => {
      examples.forEach((example, index: number) => {
        it(`Example #${index + 1}`, async () => {
          const actual = await eval(example.code)
          expect(actual).toEqual(example.expected)
        })
      })
    })
  })
})
