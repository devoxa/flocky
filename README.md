<!-- Logo -->
<p align="center">
  <img height="150" src="./logo.png">
</p>

<!-- Title -->
<h1 align="center">
  flocky
</h1>

<!-- Description -->
<h4 align="center"> 
  A TypeScript and JavaScript utility library with ... at the core.
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/flocky">
    <img
      src="https://img.shields.io/npm/v/flocky.svg?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://travis-ci.org/queicherius/flocky/branches">
    <img
      src="https://img.shields.io/travis/queicherius/flocky/master.svg?style=flat-square"
      alt="Build Status"
    />
  </a>

  <a href="https://codecov.io/github/queicherius/flocky">
    <img
      src="https://img.shields.io/codecov/c/github/queicherius/flocky/master.svg?style=flat-square"
      alt="Code Coverage"
    />
  </a>

  <a href="https://greenkeeper.io/">
    <img
      src="https://badges.greenkeeper.io/queicherius/flocky.svg?style=flat-square"
      alt="Greenkeeper badge"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#available-methods">Available Methods</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

```bash
# Using `npm`
npm install --save flocky

# Using `yarn`
yarn add flocky
```

## Usage

### Importing the full library

**TypeScript**

```ts
// Using CommonJS
import flocky = require('flocky')
flocky.sum([1, 2, 3])

// Using ES6 modules
// (!) This requires "allowSyntheticDefaultImports" and "esModuleInterop" set to "true"
import flocky from 'flocky'
flocky.sum([1, 2, 3])

// Using ES6 modules
// (!) This still imports the full library into your bundle
import {sum} from 'flocky'
sum([1, 2, 3])
```

**JavaScript**

```js
// Using CommonJS
const flocky = require('flocky')
flocky.sum([1, 2, 3])

// Using CommonJS
// (!) This still imports the full library into your bundle
const {sum} = require('flocky')
sum([1, 2, 3])

// Using ES6 modules
// (!) This requires transformation with a tool like Babel
import flocky from 'flocky'
flocky.sum([1, 2, 3])

// Using ES6 modules
// (!) This requires transformation with a tool like Babel
// (!) This still imports the full library into your bundle
import {sum} from 'flocky'
sum([1, 2, 3])
```

### Importing specific parts of the library

**TypeScript**

```ts
// Using CommonJS
import sum = require('flocky/sum')
sum([1, 2, 3])

// Using ES6 modules
// (!) This requires "allowSyntheticDefaultImports" and "esModuleInterop" set to "true"
import sum from 'flocky/sum'
sum([1, 2, 3])
```

**JavaScript**

```js
// Using CommonJS
const sum = require('flocky/sum')
sum([1, 2, 3])

// Using ES6 modules
// (!) This requires transformation with a tool like Babel
import sum from 'flocky/sum'
sum([1, 2, 3])
```

## Available Methods

<!-- START GENERATED FROM FILES -->
### average(array)

Compute the average of the values in an array.

```js
flocky.average([1, 4, 2, -4, 0])
// -> 0.6
```

### chunk(array, size)

Split an array of elements into groups of `size`.
If the array can't be split evenly, the final chunk will contain the remaining elements.

```js
flocky.chunk([1, 2, 3, 4, 5, 6, 7], 3)
// -> [[1, 2, 3], [4, 5, 6], [7]]
```

### clone(value)

Create a deep clone of `value`.
This method only supports types native to JSON, so all primitive types, arrays and objects.

```js
const original = [{ "a": 1 }, { "b": 2 }]
const clone = flocky.clone(original)
original[0] === clone[0]
// -> false
```

### identifier()

Generate a random identifier with UUID v4 format.

```js
flocky.identifier()
// -> "bfc8d57e-b9ab-4245-836e-d1fd99602e30"
```

### max(array)

Compute the maximum of the values in an array.

```js
flocky.max([1, 4, 2, -3, 0])
// -> 4
```

### min(array)

Compute the minimum of the values in an array.

```js
flocky.min([1, 4, 2, -3, 0])
// -> -3
```

### random(lower, upper, float?)

Generate a random number between `lower` and `upper` (inclusive).
If `float` is true or `lower` or `upper` is a float, a float is returned instead of an integer.

```js
flocky.random(1, 10)
// -> 8

flocky.random(1, 20, true)
// -> 14.94849340769861

flocky.random(2.5, 3.5)
// -> 3.2341312319841373
```

### roundTo(number, precision)

Round a floating point number to `precision` decimal places.

```js
flocky.roundTo(3.141592653589, 4)
// -> 3.1416

flocky.roundTo(1.005, 2)
// -> 1.01

flocky.roundTo(1111.1, -2)
// -> 1100
```

<details>
  <summary>Implementation Details</summary>

  This method avoids floating-point errors by adjusting the exponent part of
  the string representation of a number instead of multiplying and dividing
  with powers of 10. The implementation is based on [this example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round$revision/1383484#A_better_solution)
  by Lam Wei Li.
</details>

### sample(array)

Gets a random element from the array.

```js
flocky.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// -> 8
```

### shuffle(array)

Creates an array of shuffled values, using a version of the
[Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm).

```js
flocky.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
// -> [3, 7, 2, 1, 10, 4, 6, 9, 5, 8]
```

### sleep(ms)

Return a promise that waits for `ms` milliseconds before resolving.

```js
async flocky.sleep(50)
// -> undefined
```

### slugify(string)

Generates a URL-safe slug of a string.

```js
flocky.slugify(' Issue #123 is _important_! :)')
// -> "issue-123-is-important"
```

### sum(array)

Compute the sum of the values in an array.

```js
flocky.sum([1, 4, 2, -4, 0])
// -> 3
```

### unique(array, identity?)

Create a duplicate-free version of an array, in which only the first occurrence of each element is kept.
The order of result values is determined by the order they occur in the array.
Can be passed an optional `identity` function to select the identifying part of objects.

```js
flocky.unique([1, 1, 2, 4, 2, 1, 6])
// -> [1, 2, 4, 6]

flocky.unique(['foo', 'bar', 'foo', 'foobar'])
// -> ["foo", "bar", "foobar"]

const input = [{id: 1, a: 1}, {id: 1, a: 2}, {id: 2, a: 3}, {id: 1, a: 4}]
flocky.unique(input, (x) => x.id)
// -> [{"id": 1, "a": 1}, {"id": 2, "a": 3}]
```

<!-- END GENERATED FROM FILES -->

## Contributing

TODO...

## License

MIT
