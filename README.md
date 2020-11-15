<h1 align="center">  
  <img src="https://opa-oz.github.io/emoji-hash/docs/logo.png" width="150"/>
  <br>  
  EmojiHash  
</h1>  
  
<h4 align="center">Lightweight, zero-dependency library for hash-generation in emoji style 🍌</h4>  
 

[![Version npm][version]](https://www.npmjs.com/package/emoji-hash-gen)
[![License: MIT][license]](https://opensource.org/licenses/MIT)
[![PRs Welcome][pr]](https://github.com/opa-oz/emoji-hash/pulls)
[![Minsize][minsize]](https://www.npmjs.com/package/emoji-hash-gen)
![CodeQL](https://github.com/opa-oz/emoji-hash/workflows/CodeQL/badge.svg?branch=main)
![Node.js CI](https://github.com/opa-oz/emoji-hash/workflows/Node.js%20CI/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/opa-oz/emoji-hash/branch/main/graph/badge.svg)](https://codecov.io/gh/opa-oz/emoji-hash)

- [Sandbox](https://opa-oz.github.io/emoji-hash/docs/sandbox/)
- [Typedoc](https://opa-oz.github.io/emoji-hash/docs/typedoc/)
- [Coverage](https://opa-oz.github.io/emoji-hash/docs/coverage/)

## Table of Contents
- 🔌 [Installation](#installation)
- 🐥 [Usage](#usage)
- 🔨 [API](#api)
  - 🎠 [getHash](#gethash)
  - 🏠 [getBitwise](#getbitwise)
  - 🎪 [transformBinary](#transformbinary)
  - 🏆 [useTable](#usetable)
  - 📑 [Table](#table)
- 😻 [Contributing](#contributing)
  - 💁 [Setting up local development](#setting-up-local-development)
  - 🐞 [Tests](#tests)
  - 💚 [Lint & Prettier](#lint--prettier)
- 📄 [License](#license)

## Installation
You can install `emoji-hash-gen` using standard tools:
```bash
$> npm install emoji-hash-gen
# or
$> yarn add emoji-hash-gen
```

## Usage
```typescript
import { getHash } from 'emoji-hash-gen';

getHash('Hello, world'); // "🥳🤫🦁"
getHash('https://github.com/opa-oz/emoji-hash'); // "💥3️⃣🕕🕠🔇🈺"
getHash('@gahara'); // "✨🎸🍭❔🕕"

// You can restrct an amount of emojies in the hash
const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';
getHash(longText, { length: 5 }) // "💥🔻🈲🈵😺"
```

Hash-function is fully **deterministic** - you will get the same result with the same set of input data:
```typescript
import { getHash } from 'emoji-hash-gen';

getHash('@gahara') === getHash('@gahara'); // true
getHash('@gahara') === getHash('gahara'); // false
```

## API
### getHash
**Description:** 
Generates random hash from input string.

**Interface:**
```typescript
getHash(input: string, options?: Options): string;
```
----
### getBitwise
**Description:** 
Generates random integer, based on input string. 
[Source](http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/)

**Interface:**
```typescript
getBitwise(str: string): number;
```
----
### transformBinary
**Description:** 
A function used by [getHash](#getHash). 
Requires integer as input and generates an emoji-hash based on it

**Interface:**
```typescript
transformBinary(input: number, options?: Options): string;
```
---
### useTable
**Description:** 
Original library uses pre-generated table `[number]: emoji`, which used for hash-generation. `useTable` provides possibility to override the default table.

**Interface:**

```typescript
useTable(newTable: EmojiTable): void;
```
----
### Table
**Description:** 
Default table contains 62 literals, generated from:
|Symbols| Count |
|--|--|
| `a-z` | 26 |
| `A-Z` | 26 |
| `0-9` | 10 |

**Re-generate:**
```bash
$> yarn generate-table
```

**Current table:**
```javascript
// 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
{  
  0: '💥',  
  1: '❔',  
  2: '⛔️',  
  3: '👹',  
  4: '👌',  
  5: '🐞',  
  6: '🛄',  
  7: '👾',  
  8: '🈶',  
  9: '🈲',  
  10: '🐗',  
  11: '🔝',  
  12: '👝',  
  13: '🍖',  
  14: '🌍',  
  15: '😜',  
  16: '😍',  
  17: '🍭',  
  18: '🔇',  
  19: '✨',  
  20: '📌',  
  21: '👆',  
  22: '🎬',  
  23: '👵',  
  24: '🔻',  
  25: '🈵',  
  26: '🍘',  
  27: '🌂',  
  28: '💭',  
  29: '🎸',  
  30: '😺',  
  31: '🚎',  
  32: '🚛',  
  33: '🐥',  
  34: '🈺',  
  35: '🐂',  
  36: '🚴',  
  37: '✔️',  
  38: '🈹',  
  39: '📗',  
  40: '🕠',  
  41: '👯',  
  42: '3️⃣',  
  43: '💶',  
  44: '🐫',  
  45: '🇯🇵',  
  46: '👮',  
  47: '🏯',  
  48: '👏',  
  49: '📍',  
  50: '🔅',  
  51: '🐯',  
  52: '🕕',  
  53: '😁',  
  54: '🏬',  
  55: '🔍',  
  56: '🚺',  
  57: '🗾',  
  58: '🎯',  
  59: '4️⃣',  
  60: '🕘',  
  61: '🎅'  
}
```
----
## Contributing
**Please, use PRs for your proposals.**

### Setting up local development
For start, just clone repo and install dependencies via `npm`/`yarn`:
```bash
$> git clone https://github.com/opa-oz/emoji-hash.git
$> yarn install
# or
$> npm install
```

### Tests
To run test, simply use command:
```bash
$> yarn test
#or
$> npm run test
```

### Lint & Prettier
Easy to check code style and formatting:
```bash
$> yarn lint && yarn prettier-format
```

## License
emoji-hash-gen is copyright © 2020 [opa_oz](https://github.com/opa-oz). It is free software and may be redistributed under the terms specified in the [license](LICENSE).

[version]: http://img.shields.io/npm/v/emoji-hash-gen.svg?style=flat-square
[license]: https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square
[pr]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[minsize]: https://img.shields.io/bundlephobia/min/emoji-hash-gen?style=flat-square
