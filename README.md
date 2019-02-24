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
  <a href="#how-to-use">How To Use</a> •
  <a href="#available-methods">Available Methods</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<br>

## How To Use

To use this library, first you need to install it using your favorite package manager.

```bash
# With "npm"
$ npm install --save flocky

# With "yarn"
$ yarn add flocky
```

This library is optimized for modern browsers, but most methods can also be used for Node.JS.

There are two different ways to import the library:

```js
// Import the full library, use bundle shaking to remove unused parts
import flocky from 'flocky'
flocky.sum([1, 2, 3]) // -> 6

// Import only the specific parts of the library you are using
import sum from 'flocky/sum'
sum([1, 2, 3]) // -> 6
```

## Available Methods

<!-- START GENERATED FROM FILES -->
### flocky.sum

Compute the sum of the values in an array

**Example**

```js
flocky.sum([1, 4, 2, -3, 0])
// -> 4
```

<!-- END GENERATED FROM FILES -->

## Contributing

TODO...

## License

MIT
