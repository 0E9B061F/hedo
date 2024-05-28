'use strict'

const { inspect } = require('util')

const here = require('../index.js')

const phlebas = require('../spec/data/phlebas.js')


describe('here', function() {
  describe('normal interface', function () {
    it('should strip leading newline, minimum indent and trailing whitespace', function() {
      expect(here(`
        foo
          bar
          baz
        bat
      `)).toEqual('foo\n  bar\n  baz\nbat\n')
    })

    it('should handle text with no indentation', function() {
      expect(here(`
foo
bar
baz
bat
      `)).toEqual('foo\nbar\nbaz\nbat\n')
    })

    it('should handle text with some indentation', function() {
      expect(here(`
foo
  bar
    baz
      bat
      `)).toEqual('foo\n  bar\n    baz\n      bat\n')
    })

    it('should preserve blank lines', function() {
      expect(here(`
        foo

          bar
          baz

        bat
      `)).toEqual('foo\n\n  bar\n  baz\n\nbat\n')
    })

    it('should handle strings with text on the first line gracefully', function() {
      expect(here(`foo
          bar
          baz
        bat
      `)).toEqual('foo\n  bar\n  baz\nbat\n')
    })

    it('should handle single-line strings gracefully', function() {
      expect(here(`foo`)).toEqual('foo')
      expect(here(`    foo`)).toEqual('    foo')
      expect(here(`    foo    `)).toEqual('    foo    ')
    })

    it('should preserve some indentation when told to', function() {
      expect(here(`
        foo
          bar
          baz
        bat
      `, 2)).toEqual('  foo\n    bar\n    baz\n  bat\n')
    })

    it('should accept the preserve argument first if preferred', function() {
      expect(here(2, `
        foo
          bar
          baz
        bat
      `)).toEqual('  foo\n    bar\n    baz\n  bat\n')
    })

    it('should work as expected with real text', function() {
      expect(here(phlebas.input)).toEqual(phlebas.expected)
    })
    
    it('should preserve as expected with real text', function() {
      expect(here(2, phlebas.input)).toEqual(phlebas.preserved)
    })
  })

  describe('tagged templates', function () {
    it('behave the same as the standard interface', function () {
      expect(here`
        foo
          bar
          baz
        bat
      `).toEqual('foo\n  bar\n  baz\nbat\n')
      expect(here`foo
          bar
          baz
        bat
      `).toEqual('foo\n  bar\n  baz\nbat\n')
    })
    it('accepts a preserve argument and returns a new tag function', function () {
      expect(here(2)`
        foo
          bar
          baz
        bat
      `).toEqual('  foo\n    bar\n    baz\n  bat\n')
    })
    it('correctly handles newlines in interpolated variables', function () {
      const part = `a\n  b\nc\n`
      expect(here`
        foo
          bar
          ${part}
          baz
        bat
      `).toEqual('foo\n  bar\n  a\n    b\n  c\n  baz\nbat\n')
    })
  })
})
