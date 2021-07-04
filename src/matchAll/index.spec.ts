import { matchAll } from './index'

describe('matchAll', () => {
  it('matches all occurrences of the regular expression', () => {
    expect(matchAll(/\d+/g, '$200 and $400')).toEqual([
      { match: '200', subMatches: [], index: 1 },
      { match: '400', subMatches: [], index: 10 },
    ])
  })

  it('matches all occurrences of the regular expression with submatches', () => {
    expect(matchAll(/(\d+)/g, '$200 and $400')).toEqual([
      { match: '200', subMatches: ['200'], index: 1 },
      { match: '400', subMatches: ['400'], index: 10 },
    ])
  })

  it('matches all occurrences of the regular expression with multiple submatches', () => {
    expect(
      matchAll(/(\d+) and (\d+)/g, '200 and 400 or also 300 and 500')
    ).toEqual([
      { match: '200 and 400', subMatches: ['200', '400'], index: 0 },
      { match: '300 and 500', subMatches: ['300', '500'], index: 20 },
    ])
  })
})
