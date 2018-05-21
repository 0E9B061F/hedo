'use strict'


// Remove trailing spaces but only after a newline
function trimEnd(text) {
  const trailing = text.match(/[\r\n]( +)$/)
  if (trailing) {
    const trailLength = trailing[1].length
    text = text.substr(0, text.length-trailLength)
  }
  return text
}

// Get the smallest indent in a string
function minIndent(text) {
  let indents = text.match(/[\r\n]+( *)\w/g)
  if (indents) {
    indents = indents.map((sp)=> sp.length - 2)
    return Math.min(...indents)
  } else {
    return 0
  }
}

// Strip the smallest indent from each line
function deindent(text, preserve) {
  const indent = minIndent(text) - preserve
  if (indent > 0) {
    const strip = new RegExp(` {0,${indent}}(.*[\n\r])`)
    text = text.match(/.*?[\r\n]/g).map((line)=> line.match(strip)[1]).join('')
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
