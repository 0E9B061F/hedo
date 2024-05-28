'use strict'

const reStart = /^ *[\n\r]([\s\S]*)/
const reEnd = /([\s\S]*[\n\r]) *$/
const reIndent = /[\n\r]( *)\w/g
const splitRe = /([\n\r])/

// Return array of the first capture group from a global regex
function gcap(regex, text) {
  let match
  const capped = []
  while((match = regex.exec(text)) !== null) capped.push(match[1])
  return capped
}

// Remove first line if it consists only of whitespace
function trimStart(text) {
  const trimmed = text.match(reStart)
  if (trimmed) return trimmed[1]
  else return text
}

// Remove trailing spaces but only after a newline
function trimEnd(text) {
  const trimmed = text.match(reEnd)
  if (trimmed) return trimmed[1]
  else return text
}

// Get the smallest indent in a string
function minIndent(text) {
  let indents = gcap(reIndent, text)
  if (indents.length) {
    indents = indents.map((indent)=> indent.length)
    return Math.min(...indents)
  } else {
    return 0
  }
}

// Strip the given number of spaces from the beginning of each line
function stripIndent(text, indent) {
  if (indent > 0) {
    text = text.split(splitRe)
    let line, char, cut
    for (let n = 0; n < text.length; n++) {
      line = text[n]
      cut = 0
      for (let o = 0; o < line.length; o++) {
        char = line[o]
        if (cut < indent && char == " ") {
          cut += 1
        } else {
          break
        }
      }
      text[n] = line.slice(cut)
    }
    text = text.join("")
  }
  return text
}

// Strip the smallest indent from each line
function deIndent(text, preserve) {
  const indent = minIndent(text) - preserve
  return stripIndent(text, indent)
}

function process(text, preserve) {
  if (typeof(text) == 'number') {
    const t = text
    const p = preserve
    preserve = t
    text = p
  }
  text = deIndent(text, preserve)
  text = trimStart(text)
  text = trimEnd(text)
  return text
}

function mktemplate(preserve=0) {
  return (text, ...args)=> {
    let str = ''
    for (let n = 0; n < args.length; n++) {
      str += text[n]
      let arg = `${args[n]}`
      arg = arg.replace(/\r?\n$/, '')
      const sp = str.match(/(?:^|[\n\r])( +)[^\n\r]*$/)?.[1] || ''
      arg = arg.replace(/([\n\r]+)/g, `$1${sp}`)
      str += arg
    }
    str += text[text.length-1]
    return process(str, preserve)
  }
}

function here(text, ...args) {
  if (Array.isArray(text)) {
    return mktemplate(0)(text, ...args)
  } else if (typeof(text) == 'number' && !args.length) {
    const preserve = text
    return mktemplate(preserve)
  } else {
    return process(text, args[0] || 0)
  }
}


module.exports = {
  gcap,
  trimStart, trimEnd,
  minIndent, stripIndent, deIndent,
  here
}
