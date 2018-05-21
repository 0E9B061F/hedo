'use strict'

const { inspect } = require('util')

const { hedo } = require('../lib/hedo.js')
const hedoIndex = require('../index.js')


function test(doc) {
  if (!Array.isArray(doc.hedo)) doc.hedo = [doc.hedo]
  expect(hedo(...doc.hedo)).toEqual(doc.expect)
  expect(hedoIndex(...doc.hedo)).toEqual(doc.expect)
}


describe('hedo', function() {
  it('should strip leading newline, minimum indent and trailing whitespace', function() {
    test({
      hedo: (`
        foo
          bar
          baz
        bat
      `),
      expect: 'foo\n  bar\n  baz\nbat\n'
    })
  })

  it('should handle text with no indentation', function() {
    test({
      hedo: (`
foo
bar
baz
bat
      `),
      expect: 'foo\nbar\nbaz\nbat\n'
    })
  })

  it('should handle text with some indentation', function() {
    test({
      hedo: (`
foo
  bar
    baz
      bat
      `),
      expect: 'foo\n  bar\n    baz\n      bat\n'
    })
  })

  it('should preserve blank lines', function() {
    test({
      hedo: (`
        foo

          bar
          baz

        bat
      `),
      expect: 'foo\n\n  bar\n  baz\n\nbat\n'
    })
  })

  it('should handle strings with text on the first line gracefully', function() {
    test({
      hedo: (`foo
          bar
          baz
        bat
      `),
      expect: 'foo\n  bar\n  baz\nbat\n'
    })
  })

  it('should handle single-line strings gracefully', function() {
    test({ hedo: `foo`,         expect: 'foo' })
    test({ hedo: `    foo`,     expect: '    foo' })
    test({ hedo: `    foo    `, expect: '    foo    ' })
  })

  it('should preserve some indentation when told to', function() {
    test({
      hedo: [(`
        foo
          bar
          baz
        bat
      `), 2],
      expect: '  foo\n    bar\n    baz\n  bat\n'
    })
  })

  it('should accept the preserve argument first if preferred', function() {
    test({
      hedo: [2, (`
        foo
          bar
          baz
        bat
      `)],
      expect: '  foo\n    bar\n    baz\n  bat\n'
    })
  })
})
