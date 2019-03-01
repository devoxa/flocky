/**
 * ### roundTo(number, precision)
 *
 * Round a floating point number to `precision` decimal places.
 *
 * ```js
 * flocky.roundTo(3.141592653589, 4)
 * // -> 3.1416
 *
 * flocky.roundTo(1.005, 2)
 * // -> 1.01
 *
 * flocky.roundTo(1111.1, -2)
 * // -> 1100
 * ```
 *
 * <details>
 *   <summary>Implementation Details</summary>
 *
 *   This method avoids floating-point errors by adjusting the exponent part of
 *   the string representation of a number instead of multiplying and dividing
 *   with powers of 10. The implementation is based on [this example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round$revision/1383484#A_better_solution)
 *   by Lam Wei Li.
 * </details>
 */

function roundTo(number: number, precision: number): number {
  const isNegative = number < 0

  // We can only work with positive numbers in the next steps, use the absolute
  number = Math.abs(number)

  // Shift the decimal point to the right by `precision` places and round the result
  // e.g. 1.456745 with precision 3 -> 1456.745 -> 1457
  number = Math.round(shift(number, precision))

  // Shift the decimal point back to the left by `precision` places
  // e.g. 1457 with precision 3 -> 1.457
  number = shift(number, -precision)

  // If the original number was negative, the rounded number is too
  if (isNegative) {
    number = -number
  }

  return number
}

// Shift the decimal point of a `number` by `exponent` places
function shift(number: number, exponent: number): number {
  const [numberBase, numberExponent] = `${number}e`.split('e')
  return Number(`${numberBase}e${Number(numberExponent) + exponent}`)
}

export = roundTo
