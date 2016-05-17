package vellum;

import buddy.*;
using buddy.Should;

import vellum.Terminal;
import vellum.RenderableTerminal;
import vellum.Glyph;

class BufferTerminal extends RenderableTerminal {
	public var buffer:Array<Array<Int>>;
	public var changes:Int;

	public function new(w:Int, h:Int) {
		super(w, h);
		buffer = [];
		for(y in 0...h) {
			var row:Array<Int> = [];
			for(x in 0...w) {
				row.push(32);
			}
			buffer.push(row);
		}
		changes = 0;
	}

	override public function drawGlyph(x:Int, y:Int, glyph:Glyph) {
		buffer[y][x] = glyph.code;
		changes++;
	}
}

class TestRenderableTerminal extends BuddySuite {
	public function new() {
		describe('Using RenderableTerminals', {
			var t:BufferTerminal;
			beforeEach({
				t = new BufferTerminal(80, 25);
			});
			afterEach({
				t = null;
			});

			it('should correctly draw a string on an empty screen', {
				t.print(0, 0, 'Hello!');
				t.render();
				for(i in 0...'Hello!'.length) {
					t.buffer[0][i].should.be('Hello!'.charCodeAt(i));
				}
			});
			it('should only draw diff chars', {
				t.print(0, 0, 'Derp');
				t.render();
				t.changes = 0;
				t.print(0, 0, 'Herp');
				t.render();
				for(i in 0...'Herp'.length) {
					t.buffer[0][i].should.be('Herp'.charCodeAt(i));
				}
				t.changes.should.be(1);
			});
		});
	}
}
