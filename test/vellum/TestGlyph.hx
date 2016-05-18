package vellum;

import buddy.*;
using buddy.Should;

import vellum.Glyph;
import vellum.Colour;

class TestGlyph extends BuddySuite {
	public function new() {
		describe('Using Glyphs', {
			it('should be able to create glyphs from a character code', {
				var g:Glyph = new Glyph(42);
				g.code.should.be(42);
			});
			it('should be able to create glyphs from a string literal', {
				var g:Glyph = Glyph.fromChar('a');
				g.code.should.be('a'.charCodeAt(0));
			});
			it('should throw an exception if any empty string is passed', {
				Glyph.fromChar.bind('').should.throwAnything();
			});
			it('should take the character code from the first letter in a string', {
				var g:Glyph = Glyph.fromChar('testing!');
				g.code.should.be('t'.charCodeAt(0));
			});
			it('should be able to check if two glyphs are equal or not', {
				var a:Glyph = Glyph.fromChar('a', Colour.BLACK, Colour.WHITE);
				var b:Glyph = Glyph.fromChar('b', Colour.LIGHTGREY, Colour.GREY);
				a.equals(b).should.be(false);
				a.notEquals(b).should.be(true);
				b.code = 'a'.charCodeAt(0);
				b.foreground = Colour.BLACK;
				b.background = Colour.WHITE;
				a.equals(b).should.be(true);
				a.notEquals(b).should.be(false);
			});
			it('should allow setting glyph foreground and background colours', {
				var g:Glyph = new Glyph(32, Colour.GREY, Colour.WHITE);
				g.foreground.should.be(Colour.GREY);
				g.background.should.be(Colour.WHITE);
			});
			it('should allow setting default glyph forground and background colours', {
				var g:Glyph = new Glyph(32);
				g.foreground.should.be(Glyph.CLEAR_FOREGROUND);
				g.background.should.be(Glyph.CLEAR_BACKGROUND);
			});
		});
	}
}
