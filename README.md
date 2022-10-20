# hedo

[![npm](https://img.shields.io/npm/v/hedo.svg?style=flat-square)](https://www.npmjs.com/package/hedo)
[![license](https://img.shields.io/github/license/0E9B061F/hedo.svg?style=flat-square)][license]
[![maintenance](https://img.shields.io/maintenance/yes/2022.svg?style=flat-square)](https://github.com/0E9B061F/hedo/commits/master)

Yet another here doc implementation using template literals.

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
nn@Arkady:~$ node phlebas.js
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

nn@Arkady:~$ ▮
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
nn@Arkady:~$ node preserve.js
    foo
      bar
        baz
      bat
    quz

nn@Arkady:~$ ▮
```

## Tagged Templates

`hedo` is also usable as a template tag:

```js
hedo`
  foo
    bar
    baz
`
```

In this form, space can be preserved like this:

```js
hedo(2)`
  foo
    bar
    baz
`
```

### Newlines in Interpolated Variables

Most importantly, the tagged form of `hedo` handles newlines in interpolated
variables gracefully. For example:

```js
// inter-a.js

const hedo = require('hedo')

const example = "a\n  b\nc\n"
const inter = hedo`
  foo
    bar
    ${example}
  baz
`
console.log(inter)
```

Will produce:

```console
nn@Arkady:~$ node inter-a.js
foo
  bar
  a
    b
  c
bat

nn@Arkady:~$ ▮
```

Conversely, with the standard form of `hedo`:

```js
// inter-b.js

const hedo = require('hedo')

const example = "a\n  b\nc\n"
const inter = hedo(`
  foo
    bar
    ${example}
  baz
`)
console.log(inter)
```

Will produce mangled output:

```console
nn@Arkady:~$ node inter-b.js
foo
  bar
  a
  b
c
bat

nn@Arkady:~$ ▮
```

## Installation

```shell
npm install hedo
```

## License

Available under the terms of the [MIT license.][license]

Copyright 2022 [nn / @0E9B061F][nn]


[nn]:https://github.com/0E9B061F
[license]:https://github.com/0E9B061F/hedo/blob/master/LICENSE
