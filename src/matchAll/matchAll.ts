/**
 * ### matchAll(regExp, string)
 *
 * Find all matches of a regular expression in a string.
 *
 * ```js
 * flocky.matchAll(/f(o+)/g, 'foo bar baz foooo bar')
 * // -> [
 * // ->   { match: 'foo', subMatches: ['oo'], index: 0 },
 * // ->   { match: 'foooo', subMatches: ['oooo'], index: 12 },
 * // -> ]
 * ```
 */

export interface MatchAllMatch {
  match: string
  subMatches: Array<string>
  index: number
}

export function matchAll(regExp: RegExp, string: string): Array<MatchAllMatch> {
  return Array.from(string.matchAll(regExp)).map(formatMatch)
}

function formatMatch(match: RegExpMatchArray): MatchAllMatch {
  return {
    match: match[0],
    subMatches: match.slice(1, match.length),
    index: match.index!,
  }
}
