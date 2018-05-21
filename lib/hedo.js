'use strict'


// Return array of the first capture group from a global regex
function gcap(regex, text) {
  let match
  const capped = []
  while((match = regex.exec(text)) !== null) capped.push(match[1])
  return capped
}

// Remove first line if it consists only of whitespace
function trimStart(text) {
  const trimmed = text.match(/^ *[\n\r]([\s\S]*)/)
  if (trimmed) return trimmed[1]
  else return text
}

// Remove trailing spaces but only after a newline
function trimEnd(text) {
  const trimmed = text.match(/([\s\S]*[\n\r]) *$/)
  if (trimmed) return trimmed[1]
  else return text
}

// Get the smallest indent in a string
function minIndent(text) {
  let indents = gcap(/[\n\r]( *)\w/g, text)
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
    const strip = new RegExp(` {0,${indent}}(.*[\n\r])`, 'g')
    text = gcap(strip, text).join('')
  }
  return text
}

// Strip the smallest indent from each line
function deIndent(text, preserve) {
  const indent = minIndent(text) - preserve
  return stripIndent(text, indent)
}

function hedo(text, preserve=0) {
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


module.exports = {
  gcap,
  trimStart, trimEnd,
  minIndent, stripIndent, deIndent,
  hedo
}
