import { escapeRegExp } from './escapeRegExp'

describe('escapeRegExp', () => {
  test('can escape the special characters in a string', () => {
    expect(escapeRegExp('How much $$$ for this?')).toEqual('How much \\$\\$\\$ for this\\?')
    expect(escapeRegExp('\\')).toEqual('\\\\')
    expect(escapeRegExp('^^')).toEqual('\\^\\^')
  })
})
