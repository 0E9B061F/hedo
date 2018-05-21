# hedo

[![npm](https://img.shields.io/npm/v/hedo.svg?style=flat-square)](https://www.npmjs.com/package/hedo)
[![license](https://img.shields.io/github/license/aetherised/hedo.svg?style=flat-square)][license]
[![maintenance](https://img.shields.io/maintenance/yes/2018.svg?style=flat-square)](https://github.com/aetherised/hedo/commits/master)

**Yet another here doc implementation using template literals.** *Slightly* faster
than similar tools that were tested. Con: currently assumes all indentation will
be spaces; doesn't understand tabs.

## Example

Consider `phlebas.js`:

```js
// phlebas.js

const hedo = require('hedo')

const phlebas = hedo(`
            IV. Death by Water

    Phlebas the Phoenician, a fortnight dead,
    Forgot the cry of gulls, and the deep sea swell
    And the profit and loss.
                          A current under sea
    Picked his bones in whispers. As he rose and fell
    He passed the stages of his age and youth
    Entering the whirlpool.
                          Gentile or Jew
    O you who turn the wheel and look to windward,
    Consider Phlebas, who was once handsome and tall as you.
`)

console.log(phlebas)
```

Running this script will give the following result:

```console
aetherised@Oberon:~$ node phlebas.js
        IV. Death by Water

Phlebas the Phoenician, a fortnight dead,
Forgot the cry of gulls, and the deep sea swell
And the profit and loss.
                      A current under sea
Picked his bones in whispers. As he rose and fell
He passed the stages of his age and youth
Entering the whirlpool.
                      Gentile or Jew
O you who turn the wheel and look to windward,
Consider Phlebas, who was once handsome and tall as you.

aetherised@Oberon:~$ ▮
```

### Preserving Some Indentation

Suppose you want to preserve some level of indentation. To do so, specify a
number as either the first or second argument to `hedo`. The given number of
spaces will be preserved:

```js
// preserve.js

const hedo = require('hedo')

const metasyntatic = hedo(4, `
            foo
              bar
                baz
              bat
            quz
`)

console.log(metasyntatic)
```

Four spaces of indentation will be preserved:

```console
aetherised@Oberon:~$ node preserve.js
    foo
      bar
        baz
      bat
    quz

aetherised@Oberon:~$ ▮
```

## Installation

```shell
npm install hedo
```

## License

Available under the terms of the [MIT license.][license]

Copyright 2018 [Abacus Lever / @aetherised][alever]


[alever]:https://github.com/aetherised
[license]:https://github.com/aetherised/hedo/blob/master/LICENSE
