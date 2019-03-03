/**
 * ### slugify(string)
 *
 * Generates a URL-safe slug of a string.
 *
 * ```js
 * flocky.slugify(' Issue #123 is _important_! :)')
 * // -> "issue-123-is-important"
 * ```
 */

function slugify(string: string): string {
  return string
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace all clusters of non-word characters with a single "-"
    .replace(/^[-]+|[-]+$/g, '') // Trim "-" from start and end
}

export = slugify
