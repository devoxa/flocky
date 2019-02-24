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
### flocky.min

Compute the minimum of the values in an array

```js
flocky.min([1, 4, 2, -3, 0])
// -> -3
```

### flocky.sum

Compute the sum of the values in an array

```js
flocky.sum([1, 4, 2, -3, 0])
// -> 4
```

<!-- END GENERATED FROM FILES -->

## Contributing

TODO...

## License

MIT
