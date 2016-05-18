package vellum;

import buddy.*;
using buddy.Should;

import vellum.Display;
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

			it('should allow adding and removing windows', {
				var w1:Window = new Window(5, 10, 0, 5, 6);
				t.addWindow(w1);
				t.getWindow(0).should.be(w1);
				t.getWindow(1).should.be(null);

				var w2:Window = t.pushWindow(0, 0, 10, 10);
				w2.x.should.be(0);
				w2.y.should.be(0);
				w2.width.should.be(10);
				w2.height.should.be(10);
				w2.z.should.be(1);

				t.removeWindow(w1);
				t.getWindow(0).should.be(w2);
				t.popWindow().should.be(w2);
				t.getWindow(0).should.be(null);
			});
			it('should always keep windows sorted based on depth', {
				t.addWindow(new Window(1, 1, 1, 1, 1));
				t.addWindow(new Window(0, 0, 0, 1, 1));
				t.addWindow(new Window(2, 2, 2, 1, 1));
				t.getWindow(0).x.should.be(0);
				t.getWindow(1).x.should.be(1);
				t.getWindow(2).x.should.be(2);

				var w:Window = t.getWindow(1);
				t.removeWindow(w);

				t.getWindow(0).x.should.be(0);
				t.getWindow(1).x.should.be(2);
			});
			it('should correctly draw the windows to its terminal buffer', {
				var w1:Window = t.pushWindow(0, 0, 10, 1);
				var w2:Window = t.pushWindow(2, 0, 10, 1);
				for(i in 0...10) {
					w1.writeChar(i, 0, 'A');
					w2.writeChar(i, 0, 'B');
				}

				t.render();

				t.glyph(0, 0).code.should.be('A'.charCodeAt(0));
				t.glyph(1, 0).code.should.be('A'.charCodeAt(0));
				for(i in 2...12) {
					t.glyph(i, 0).code.should.be('B'.charCodeAt(0));
				}
			});
		});
	}
}
