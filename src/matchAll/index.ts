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

export function matchAll(regExp: RegExp, string: string) {
  return Array.from(string.matchAll(regExp)).map(formatMatch)
}

function formatMatch(match: RegExpMatchArray) {
  return {
    match: match[0],
    subMatches: match.slice(1, match.length),
    index: match.index,
  }
}

export default matchAll
