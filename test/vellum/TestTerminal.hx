package vellum;

import buddy.*;
using buddy.Should;

import vellum.Terminal;
import vellum.Glyph;

class TestTerminal extends BuddySuite {
	public function new() {
		describe('Using Terminals', {
			var t:Terminal;
			beforeEach({
				t = new Terminal(80, 25);
			});
			afterEach({
				t = null;
			});

			it('should read and write provide access to the width and height of the terminal', {
				t.width.should.be(80);
				t.width = 120;
				t.width.should.be(120);
				t.height.should.be(25);
				t.height = 30;
				t.height.should.be(30);
			});
			it('should provide access to glyphs via x,y coordinates', {
				t.glyph(0, 0).code.should.be(' '.charCodeAt(0));
			});
			it('should allow you to clear the entire screen', {
				t.clear();
				for(y in 0...t.height) {
					for(x in 0...t.width) {
						t.glyph(x, y).code.should.be(' '.charCodeAt(0));
						t.glyph(x, y).foreground.should.be(Glyph.CLEAR_FOREGROUND);
						t.glyph(x, y).background.should.be(Glyph.CLEAR_BACKGROUND);
					}
				}
			});
			it('should allow you to print strings to the screen', {
				t.print(0, 0, 'Hello!');
				for(i in 0...'Hello!'.length) {
					t.glyph(i, 0).code.should.be('Hello!'.charCodeAt(i));
				}
			});
		});
	}
}
