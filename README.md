# **heretag** v1.1.5
[![Version][icon-ver]][repo]
[![License][icon-lic]][license]
[![Maintenance][icon-mnt]][commits]<br/>
[![npm][icon-npm]][npm]

A heredoc implementation using template literals.

## Example

Consider `phlebas.js`:

```js
// phlebas.js

const here = require('heretag')

const phlebas = here(`
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
number as either the first or second argument to `here`. The given number of
spaces will be preserved:

```js
// preserve.js

const here = require('heretag')

const metasyntatic = here(4, `
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

`here` is also usable as a template tag:

```js
here`
  foo
    bar
    baz
`
```

In this form, space can be preserved like this:

```js
here(2)`
  foo
    bar
    baz
`
```

### Newlines in Interpolated Variables

Most importantly, the tagged form of `here` handles newlines in interpolated
variables gracefully. For example:

```js
// inter-a.js

const here = require('heretag')

const example = "a\n  b\nc\n"
const inter = here`
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

Conversely, with the standard form of `here`:

```js
// inter-b.js

const here = require('heretag')

const example = "a\n  b\nc\n"
const inter = here(`
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
npm install heretag
```

# License

Copyright 2020-2024 **[0E9B061F][gh]**<br/>
Available under the terms of the [Mozilla Public License Version 2.0][license].


[gh]:https://github.com/0E9B061F
[repo]:https://github.com/0E9B061F/heretag
[npm]:https://www.npmjs.com/package/heretag
[commits]:https://github.com/0E9B061F/heretag/commits/master
[license]:https://github.com/0E9B061F/heretag/blob/master/LICENSE

[icon-ver]:https://img.shields.io/github/package-json/v/0E9B061F/heretag.svg?style=flat-square&logo=github&color=%236e7fd2
[icon-npm]:https://img.shields.io/npm/v/heretag.svg?style=flat-square&color=%23de2657
[icon-lic]:https://img.shields.io/github/license/0E9B061F/heretag.svg?style=flat-square&color=%236e7fd2
[icon-mnt]:https://img.shields.io/maintenance/yes/2024.svg?style=flat-square

