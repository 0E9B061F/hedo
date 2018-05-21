'use strict'


// Return array of the first capture group from a global regex
function gcap(regex, text) {
  let match
  const capped = []
  while((match = regex.exec(text)) !== null) capped.push(match[1])
  return capped
}

// Remove trailing spaces but only after a newline
function trimEnd(text) {
  const trimmed = text.match(/([\s\w]*?\n) *$/)
  if (trimmed) return trimmed[1]
  else return text
}

// Get the smallest indent in a string
function minIndent(text) {
  let indents = gcap(/[\r\n]( *)\w/g, text)
  if (indents.length) {
    indents = indents.map((indent)=> indent.length)
    return Math.min(...indents)
  } else {
    return 0
  }
}

// Strip the smallest indent from each line
function deindent(text, preserve) {
  const indent = minIndent(text) - preserve
  if (indent > 0) {
    const strip = new RegExp(` {0,${indent}}(.*[\n\r])`, 'g')
    text = gcap(strip, text).join('')
  }
  return text
}

function hedo(text, preserve=0) {
  if (typeof(text) == 'number') {
    const t = text
    const p = preserve
    preserve = t
    text = p
  }
  text = deindent(text, preserve)
  if (text[0] === '\n') text = text.substr(1)
  text = trimEnd(text)
  return text
}


module.exports = { trimEnd, minIndent, deindent, hedo }
