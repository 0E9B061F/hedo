'use strict'

const { inspect } = require('util')

const hedo = require('../index.js')

const phlebas = require('../spec/data/phlebas.js')


describe('hedo', function() {
  describe('normal interface', function () {
    it('should strip leading newline, minimum indent and trailing whitespace', function() {
      expect(hedo(`
        foo
          bar
          baz
        bat
      `)).toEqual('foo\n  bar\n  baz\nbat\n')
    })

    it('should handle text with no indentation', function() {
      expect(hedo(`
foo
bar
baz
bat
      `)).toEqual('foo\nbar\nbaz\nbat\n')
    })

    it('should handle text with some indentation', function() {
      expect(hedo(`
foo
  bar
    baz
      bat
      `)).toEqual('foo\n  bar\n    baz\n      bat\n')
    })

    it('should preserve blank lines', function() {
      expect(hedo(`
        foo

          bar
          baz

        bat
      `)).toEqual('foo\n\n  bar\n  baz\n\nbat\n')
    })

    it('should handle strings with text on the first line gracefully', function() {
      expect(hedo(`foo
          bar
          baz
        bat
      `)).toEqual('foo\n  bar\n  baz\nbat\n')
    })

    it('should handle single-line strings gracefully', function() {
      expect(hedo(`foo`)).toEqual('foo')
      expect(hedo(`    foo`)).toEqual('    foo')
      expect(hedo(`    foo    `)).toEqual('    foo    ')
    })

    it('should preserve some indentation when told to', function() {
      expect(hedo(`
        foo
          bar
          baz
        bat
      `, 2)).toEqual('  foo\n    bar\n    baz\n  bat\n')
    })

    it('should accept the preserve argument first if preferred', function() {
      expect(hedo(2, `
        foo
          bar
          baz
        bat
      `)).toEqual('  foo\n    bar\n    baz\n  bat\n')
    })

    it('should work as expected with real text', function() {
      expect(hedo(phlebas.input)).toEqual(phlebas.expected)
    })
    
    it('should preserve as expected with real text', function() {
      expect(hedo(2, phlebas.input)).toEqual(phlebas.preserved)
    })
  })

  describe('tagged templates', function () {
    it('behave the same as the standard interface', function () {
      expect(hedo`
        foo
          bar
          baz
        bat
      `).toEqual('foo\n  bar\n  baz\nbat\n')
      expect(hedo`foo
          bar
          baz
        bat
      `).toEqual('foo\n  bar\n  baz\nbat\n')
    })
    it('accepts a preserve argument and returns a new tag function', function () {
      expect(hedo(2)`
        foo
          bar
          baz
        bat
      `).toEqual('  foo\n    bar\n    baz\n  bat\n')
    })
    it('correctly handles newlines in interpolated variables', function () {
      const part = `a\n  b\nc\n`
      expect(hedo`
        foo
          bar
          ${part}
          baz
        bat
      `).toEqual('foo\n  bar\n  a\n    b\n  c\n  baz\nbat\n')
    })
  })
})
